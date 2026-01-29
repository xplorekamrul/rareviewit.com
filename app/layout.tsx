import { ChatLauncher } from "@/components/chat/chat-launcher";
import { ChatProvider } from "@/components/chat/chat-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import { DraggableFloater } from "@/components/ui/draggable-floater";

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
      <body className={`font-sans antialiased  `}>
        <ThemeProvider defaultTheme="light">
          <ChatProvider>
            <main className="min-h-screen">{children}</main>
            <DraggableFloater className="fixed bottom-6 right-6 z-50">
              <ThemeToggle />
            </DraggableFloater>
            <ChatLauncher />
          </ChatProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
