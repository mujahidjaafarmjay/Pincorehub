import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { paystack } from "@/lib/paystack"
import { z } from "zod"

const paymentSchema = z.object({
  courseId: z.string().optional(),
  bookingId: z.string().optional(),
  amount: z.number().min(1, "Amount must be positive"),
  description: z.string().min(1, "Description is required"),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { courseId, bookingId, amount, description } = paymentSchema.parse(body)

    // Generate unique reference
    const reference = `PINCORE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount,
        reference,
        description,
        metadata: {
          courseId,
          bookingId,
        },
      },
    })

    // Initialize payment with Paystack
    const paystackResponse = await paystack.initializePayment({
      email: session.user.email!,
      amount,
      reference,
      callback_url: `${process.env.NEXTAUTH_URL}/payment/callback`,
      metadata: {
        userId: session.user.id,
        paymentId: payment.id,
        courseId,
        bookingId,
      },
    })

    if (!paystackResponse.status) {
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: 400 })
    }

    return NextResponse.json({
      paymentUrl: paystackResponse.data.authorization_url,
      reference: paystackResponse.data.reference,
      paymentId: payment.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }

    console.error("Payment initialization error:", error)
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 })
  }
}
