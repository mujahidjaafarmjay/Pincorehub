import nodemailer from "nodemailer"

// Configure your SMTP transporter
// IMPORTANT: In a production environment, use environment variables for all credentials.
// For Qserver, you would need to get your SMTP details from their platform.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  try {
    await transporter.sendMail({
      from: `"pincohub" <${process.env.SMTP_USER}>`, // sender address
      to,
      subject,
      html,
      text,
    })
    console.log(`Email sent to ${to} with subject: ${subject}`)
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error)
    throw new Error("Failed to send email")
  }
}
