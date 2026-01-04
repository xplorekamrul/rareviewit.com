// components/home/TestimonialsSection.tsx
"use client"

import { AnimateInView } from "@/components/animate-in-view"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

type Testimonial = { name: string; role: string; avatar: string; content: string; rating: number }
type TestimonialsBlock = {
  title: string
  subtitle: string
  items: readonly Testimonial[]
}

export default function TestimonialsSection({ data }: { data: TestimonialsBlock }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Transform data to match AnimatedTestimonials format
  const transformedTestimonials = data.items.map((t) => ({
    quote: t.content,
    name: t.name,
    designation: t.role,
    src: t.avatar || "/placeholder.svg",
  }))

  const handleSliderChange = (value: number[]) => {
    setCurrentIndex(value[0])
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <AnimateInView className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            {data.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
            {data.subtitle}
          </p>
        </AnimateInView>

        <AnimateInView className="mx-auto max-w-4xl">
          <AnimatedTestimonials testimonials={transformedTestimonials} autoplay={true} />

         
        </AnimateInView>
      </div>
    </section>
  )
}
