import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.PAYSTACK_WEBHOOK_SECRET!
    const signature = request.headers.get("x-paystack-signature")
    const body = await request.text() // Read as text to verify signature

    if (!signature) {
      return NextResponse.json({ error: "No signature provided" }, { status: 400 })
    }

    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex")

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === "charge.success") {
      const { reference, status, channel, metadata, customer, amount } = event.data

      if (status === "success") {
        const payment = await prisma.payment.update({
          where: { reference },
          data: {
            status: "COMPLETED",
            paymentMethod: channel,
            amount: amount / 100, // Paystack amount is in kobo/cents
          },
        })

        // Handle course enrollment if applicable
        if (metadata && metadata.courseId) {
          await prisma.enrollment.create({
            data: {
              userId: payment.userId,
              courseId: metadata.courseId,
            },
          })

          const course = await prisma.course.findUnique({ where: { id: metadata.courseId } })
          const user = await prisma.user.findUnique({ where: { id: payment.userId } })

          if (user && course) {
            await sendEmail({
              to: user.email,
              subject: `Enrollment Confirmation: ${course.title}`,
              html: `
                <h1>Congratulations, ${user.name}!</h1>
                <p>You have successfully enrolled in the course: <strong>${course.title}</strong>.</p>
                <p>You can now access your course materials from your dashboard.</p>
                <p><a href="${process.env.NEXTAUTH_URL}/dashboard">Go to your Dashboard</a></p>
              `,
              text: `Congratulations, ${user.name}! You have successfully enrolled in the course: ${course.title}. Go to your Dashboard: ${process.env.NEXTAUTH_URL}/dashboard`,
            })
          }
        }

        // Handle booking confirmation if applicable
        if (metadata && metadata.bookingId) {
          await prisma.booking.update({
            where: { id: metadata.bookingId },
            data: { status: "CONFIRMED" },
          })

          const booking = await prisma.booking.findUnique({ where: { id: metadata.bookingId } })
          const user = await prisma.user.findUnique({ where: { id: payment.userId } })

          if (user && booking) {
            await sendEmail({
              to: user.email,
              subject: `Booking Confirmation: ${booking.serviceName}`,
              html: `
                <h1>Hello, ${user.name}!</h1>
                <p>Your booking for <strong>${booking.serviceName}</strong> has been confirmed.</p>
                <p>Date: ${new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Time: ${booking.bookingTime}</p>
                <p>We look forward to seeing you!</p>
                <p><a href="${process.env.NEXTAUTH_URL}/dashboard/bookings">View your Bookings</a></p>
              `,
              text: `Hello, ${user.name}! Your booking for ${booking.serviceName} has been confirmed. Date: ${new Date(booking.bookingDate).toLocaleDateString()} Time: ${booking.bookingTime}. View your Bookings: ${process.env.NEXTAUTH_URL}/dashboard/bookings`,
            })
          }
        }
      }
    }

    return NextResponse.json({ status: "success" }, { status: 200 })
  } catch (error) {
    console.error("Paystack webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
