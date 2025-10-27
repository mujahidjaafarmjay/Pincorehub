import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const emailSchema = z.object({
  to: z.string().email("Invalid recipient email"),
  subject: z.string().min(1, "Subject is required"),
  html: z.string().min(1, "Email content is required"),
  text: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html, text } = emailSchema.parse(body)

    // In a real application, you would integrate with an email service here (e.g., Resend, SendGrid, Nodemailer)
    // For demonstration purposes, we'll just log the email details.

    console.log("--- Sending Email ---")
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log("HTML Content:")
    console.log(html)
    if (text) {
      console.log("Text Content:")
      console.log(text)
    }
    console.log("---------------------")

    // Simulate sending success
    return NextResponse.json({ message: "Email sent successfully (simulated)" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
