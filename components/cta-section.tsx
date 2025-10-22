"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimateInView } from "./animate-in-view"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-32">
      <div className="container relative z-10 px-4">
        <AnimateInView className="mx-auto max-w-3xl text-center" scale>
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl text-balance">
            Ready to Transform Your Business?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 md:text-xl text-balance">
            Let's discuss how we can help you achieve your digital goals and drive real results for your business.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/services">Explore Services</Link>
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
