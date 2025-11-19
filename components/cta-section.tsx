// components/home/CtaSection.tsx
"use client"

import { AnimateInView } from "@/components/animate-in-view"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

type CTAData = {
  title: string
  description: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}

export default function CtaSection({ data }: { data: CTAData }) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-32">
      <div className="container relative z-10 px-4">
        <AnimateInView className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl text-balance">
            {data.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-primary-foreground md:text-xl text-balance">
            {data.description}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href={data.primary.href}>
                {data.primary.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href={data.secondary.href}>{data.secondary.label}</Link>
            </Button>
          </div>
        </AnimateInView>
      </div>

      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute -left-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>
    </section>
  )
}
