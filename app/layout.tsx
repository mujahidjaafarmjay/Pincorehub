import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LiveChat from "@/components/live-chat"
import FloatingElements from "@/components/floating-elements"
import ScrollProgress from "@/components/scroll-progress"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PINCOREHUB - Your Complete Tech Partner | Online & Offline Solutions",
  description:
    "From device repairs to AI automation, PINCOREHUB provides integrated digital and physical tech solutions for individuals and businesses across Nigeria. Visit our shop or get online support.",
  keywords:
    "computer repair Nigeria, website development Lagos, mobile app development, digital marketing Nigeria, ICT training, crypto education, tech services Lagos, CCTV installation, solar system setup, online courses",
  authors: [{ name: "PINCOREHUB" }],
  creator: "PINCOREHUB",
  publisher: "Business Company",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://pincorehub.com.ng",
    siteName: "PINCOREHUB",
    title: "PINCOREHUB - Your Complete Tech Partner",
    description: "Professional tech solutions across Nigeria - from device repairs to AI automation",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PINCOREHUB - Tech Solutions Provider",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PINCOREHUB - Your Complete Tech Partner",
    description: "Professional tech solutions across Nigeria - from device repairs to AI automation",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FFA500" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ScrollProgress />
        <FloatingElements />
        <Header />
        <main>{children}</main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  )
}
