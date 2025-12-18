import { ChatLauncher } from "@/components/chat/chat-launcher";
import { ChatProvider } from "@/components/chat/chat-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RareviewIt Agency | Digital Solutions & Design Services",
  description:
    "Transform your business with our comprehensive digital services including web design, SEO, digital marketing, and app development.",
  generator: "v0.app",
  keywords: ["web design", "digital marketing", "SEO", "app development", "RareviewIt agency", "SaaS"],
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
            <ChatLauncher />
          </ChatProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
