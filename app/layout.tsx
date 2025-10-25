import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatProvider } from "@/components/chat/chat-provider"
import { ChatWidget } from "@/components/chat/chat-widget"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Agency | Digital Solutions & Design Services",
  description:
    "Transform your business with our comprehensive digital services including web design, SEO, digital marketing, and app development.",
  generator: "v0.app",
  keywords: ["web design", "digital marketing", "SEO", "app development", "creative agency", "SaaS"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased  max-w-[1250px] mx-auto`}>
        <ThemeProvider defaultTheme="light">
          <ChatProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
            <ThemeToggle />
            <ChatWidget />
          </ChatProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
