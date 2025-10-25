// components/home/TestimonialsSection.tsx
"use client"

import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

type Testimonial = { name: string; role: string; avatar: string; content: string; rating: number }
type TestimonialsBlock = {
  title: string
  subtitle: string
  items: readonly Testimonial[]
}

export default function TestimonialsSection({ data }: { data: TestimonialsBlock }) {
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

        <StaggerContainer className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {data.items.map((t, index) => (
            <AnimateInView key={index} delay={index * 0.1}>
              <Card className="h-full transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground leading-relaxed">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={t.avatar || "/placeholder.svg"} alt={t.name} />
                      <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateInView>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
