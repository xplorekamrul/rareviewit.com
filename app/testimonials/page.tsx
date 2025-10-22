"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechStart Inc",
      avatar: "/testimonial-sarah.png",
      content:
        "Working with this team completely transformed our online presence. Their web design expertise helped us increase our conversion rate by 300% in just three months. The attention to detail and understanding of our business goals was exceptional.",
      rating: 5,
      project: "Website Redesign",
    },
    {
      name: "Michael Chen",
      role: "Founder",
      company: "GrowthLabs",
      avatar: "/testimonial-michael.png",
      content:
        "The digital marketing campaign they created exceeded all our expectations. We saw a 250% increase in qualified leads within the first quarter. Their data-driven approach and creative strategies made all the difference.",
      rating: 5,
      project: "Digital Marketing",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Innovate Co",
      avatar: "/testimonial-emily.png",
      content:
        "Their SEO expertise helped us dominate our market. We're now ranking #1 for all our target keywords, and our organic traffic has increased by 500%. The ROI has been incredible.",
      rating: 5,
      project: "SEO Services",
    },
    {
      name: "David Park",
      role: "CTO",
      company: "FinTech Solutions",
      avatar: "/testimonial-david.png",
      content:
        "The mobile app they developed for us is outstanding. The user experience is seamless, and our customers love it. We've seen a 40% increase in user engagement since launch.",
      rating: 5,
      project: "App Development",
    },
    {
      name: "Lisa Thompson",
      role: "VP of Operations",
      company: "RetailPro",
      avatar: "/testimonial-lisa.png",
      content:
        "From start to finish, the process was smooth and professional. They took the time to understand our needs and delivered a solution that perfectly aligned with our business objectives.",
      rating: 5,
      project: "E-commerce Platform",
    },
    {
      name: "James Wilson",
      role: "Owner",
      company: "Local Services Co",
      avatar: "/testimonial-james.png",
      content:
        "As a small business, we needed a partner who could deliver big results on a reasonable budget. They exceeded our expectations in every way. Our online bookings have tripled!",
      rating: 5,
      project: "Website & SEO",
    },
    {
      name: "Amanda Foster",
      role: "Brand Manager",
      company: "Lifestyle Brand",
      avatar: "/testimonial-amanda.png",
      content:
        "The branding and design work they did for us was phenomenal. They captured our vision perfectly and created a cohesive brand identity that resonates with our target audience.",
      rating: 5,
      project: "Brand Identity",
    },
    {
      name: "Robert Martinez",
      role: "Director of Sales",
      company: "B2B Solutions",
      avatar: "/testimonial-robert.png",
      content:
        "Their strategic approach to digital marketing has been a game-changer for our sales team. The quality of leads has improved dramatically, and our close rate has increased by 45%.",
      rating: 5,
      project: "Lead Generation",
    },
    {
      name: "Jennifer Lee",
      role: "Founder",
      company: "Health & Wellness",
      avatar: "/testimonial-jennifer.png",
      content:
        "Working with this team felt like having an in-house digital department. They were responsive, creative, and always went above and beyond to ensure our success.",
      rating: 5,
      project: "Full Digital Strategy",
    },
  ]

  const stats = [
    { value: "98%", label: "Client Satisfaction" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "200+", label: "Happy Clients" },
    { value: "95%", label: "Client Retention" },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              Testimonials
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              What Our Clients Say
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              Don't just take our word for it. Hear from the businesses we've helped transform and grow through our
              digital services.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/20 py-12 md:py-16">
        <div className="container px-4">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <AnimateInView key={index} delay={index * 0.1} className="text-center">
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
            {testimonials.map((testimonial, index) => (
              <AnimateInView key={index} delay={index * 0.1}>
                <Card className="relative transition-all hover:shadow-lg h-full">
                  <CardContent className="p-6">
                    <Quote className="mb-4 h-8 w-8 text-accent/20" />

                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
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
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.project}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Video Testimonials Section */}
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
            {[1, 2].map((index) => (
              <AnimateInView key={index} delay={index * 0.1} scale>
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="mb-2 text-4xl">▶</div>
                      <div>Video Testimonial {index}</div>
                    </div>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView scale className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Ready to Join Our Success Stories?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              Let's create a success story for your business. Get in touch to discuss your project.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
