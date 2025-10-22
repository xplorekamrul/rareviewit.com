"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { AnimateInView } from "./animate-in-view"
import { StaggerContainer } from "./stagger-container"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      avatar: "/professional-woman-headshot.png",
      content:
        "Working with this team transformed our online presence. Our traffic increased by 300% in just three months!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, GrowthLabs",
      avatar: "/professional-man-headshot.png",
      content:
        "The attention to detail and creative approach exceeded our expectations. Highly recommend their services!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, Innovate Co",
      avatar: "/professional-woman-headshot-2.png",
      content: "Their SEO expertise helped us dominate our market. We're now ranking #1 for all our target keywords.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <AnimateInView className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
            Don't just take our word for it - hear from businesses we've helped succeed
          </p>
        </AnimateInView>

        <StaggerContainer className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimateInView key={index} delay={index * 0.1}>
              <Card className="h-full transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
