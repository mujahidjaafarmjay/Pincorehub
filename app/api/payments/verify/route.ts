import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { paystack } from "@/lib/paystack"

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required" }, { status: 400 })
    }

    // Verify payment with Paystack
    const verification = await paystack.verifyPayment(reference)

    if (!verification.status || verification.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    // Update payment status
    const payment = await prisma.payment.update({
      where: { reference },
      data: {
        status: "COMPLETED",
        paymentMethod: verification.data.channel,
      },
    })

    // Handle course enrollment if applicable
    if (payment.metadata && typeof payment.metadata === "object" && "courseId" in payment.metadata) {
      const courseId = payment.metadata.courseId as string

      await prisma.enrollment.create({
        data: {
          userId: payment.userId,
          courseId: courseId,
        },
      })
    }

    // Handle booking confirmation if applicable
    if (payment.metadata && typeof payment.metadata === "object" && "bookingId" in payment.metadata) {
      const bookingId = payment.metadata.bookingId as string

      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
      })
    }

    return NextResponse.json({
      success: true,
      payment,
      message: "Payment verified successfully",
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
