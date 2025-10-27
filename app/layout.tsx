import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/use-auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"), // Use NEXTAUTH_URL for dynamic base URL
  title: {
    default: "pincohub - Learn, Grow, Succeed",
    template: "%s | pincohub",
  },
  description:
    "pincohub offers expert training, courses, and consulting services in IT, business, and personal development. Learn, grow, and succeed with us.",
  keywords: ["pincohub", "IT training", "business consulting", "personal development", "online courses", "Nigeria"],
  openGraph: {
    title: "pincohub - Learn, Grow, Succeed",
    description:
      "pincohub offers expert training, courses, and consulting services in IT, business, and personal development. Learn, grow, and succeed with us.",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000", // Use NEXTAUTH_URL for dynamic URL
    siteName: "pincohub",
    images: [
      {
        url: "/opengraph-image.jpg", // Replace with your actual Open Graph image
        width: 1200,
        height: 630,
        alt: "pincohub - Learn, Grow, Succeed",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "pincohub - Learn, Grow, Succeed",
    description:
      "pincohub offers expert training, courses, and consulting services in IT, business, and personal development. Learn, grow, and succeed with us.",
    creator: "@pincorehub", // Replace with your Twitter handle
    images: ["/twitter-image.jpg"], // Replace with your actual Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
        {/* Google Analytics Script (replace with your actual GA4 tag) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" // Replace G-XXXXXXXXXX with your GA4 Measurement ID
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX'); // Replace G-XXXXXXXXXX with your GA4 Measurement ID
            `,
          }}
        />
      </body>
    </html>
  )
}
