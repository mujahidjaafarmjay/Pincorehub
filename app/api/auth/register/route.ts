import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { sendEmail } from "@/lib/email"

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: "USER", // Default role
      },
    })

    // Send welcome email
    await sendEmail({
      to: user.email,
      subject: "Welcome to pincohub!",
      html: `
        <h1>Welcome, ${user.name}!</h1>
        <p>Thank you for registering with pincohub. We're excited to have you on board.</p>
        <p>Start exploring our courses and services today!</p>
        <p><a href="${process.env.NEXTAUTH_URL}/auth/signin">Login to your account</a></p>
      `,
      text: `Welcome, ${user.name}! Thank you for registering with pincohub. Start exploring our courses and services today! Login to your account: ${process.env.NEXTAUTH_URL}/auth/signin`,
    })

    return NextResponse.json(
      { message: "User registered successfully", user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
