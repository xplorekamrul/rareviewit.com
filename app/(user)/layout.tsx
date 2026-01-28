import { ChatButton } from "@/components/chat/chat-button";
import { ChatLauncher } from "@/components/chat/chat-launcher";
import { ChatProvider } from "@/components/chat/chat-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type React from "react";



import { DraggableFloater } from "@/components/ui/draggable-floater";

export const metadata: Metadata = {
  title: "RareviewIt Agency | Digital Solutions & Design Services",
  description:
    "Transform your business with our comprehensive digital services including web design, SEO, digital marketing, and app development.",
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
            <DraggableFloater className="fixed bottom-24 right-6 z-[9998]">
              <ChatButton />
            </DraggableFloater>
            <ChatLauncher />
          </ChatProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}