"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

type Stat = { value: string; label: string }
type Testimonial = {
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  project: string
}

type TestimonialsData = {
  hero: { badge: string; title: string; subtitle: string }
  stats: ReadonlyArray<Stat>
  items: ReadonlyArray<Testimonial>
  videos: { count: number; label: string }
  cta: { title: string; subtitle: string; buttonText: string; href: string }
}

export default function TestimonialsClient({ data }: { data: TestimonialsData }) {
  const { hero, stats, items, videos, cta } = data

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              {hero.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {hero.subtitle}
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/20 py-12 md:py-16">
        <div className="container px-4">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <AnimateInView key={`${stat.label}-${index}`} delay={index * 0.1} className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground md:text-base">{stat.label}</div>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t, index) => (
              <AnimateInView key={`${t.name}-${index}`} delay={index * 0.1}>
                <Card className="relative h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <Quote className="mb-4 h-8 w-8 text-accent/20" />

                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
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
                        <div className="text-sm text-muted-foreground">
                          {t.role}, {t.company}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-border pt-4">
                      <Badge variant="secondary" className="text-xs">
                        {t.project}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Video Testimonials
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Hear directly from our clients about their experience working with us
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: videos.count }).map((_, i) => (
              <AnimateInView key={i} delay={(i + 1) * 0.1} >
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="mb-2 text-4xl">▶</div>
                      <div>
                        {videos.label} {i + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView  className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              {cta.subtitle}
            </p>
            <Button size="lg" asChild>
              <Link href={cta.href}>{cta.buttonText}</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
