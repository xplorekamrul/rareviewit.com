"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, TrendingUp, Target, Users, BarChart } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function DigitalMarketingPage() {
  const services = [
    {
      icon: Users,
      title: "Social Media Marketing",
      description: "Build and engage your audience across all major social platforms.",
    },
    {
      icon: Target,
      title: "PPC Advertising",
      description: "Targeted campaigns that maximize ROI and drive qualified leads.",
    },
    {
      icon: TrendingUp,
      title: "Content Marketing",
      description: "Compelling content that attracts, engages, and converts your audience.",
    },
    {
      icon: BarChart,
      title: "Analytics & Reporting",
      description: "Data-driven insights to optimize your marketing performance.",
    },
  ]

  const benefits = [
    "Increase brand awareness and reach",
    "Generate high-quality leads consistently",
    "Improve customer engagement and loyalty",
    "Achieve measurable ROI on marketing spend",
    "Stay ahead of competitors in your market",
    "Build a strong online presence",
  ]

  const stats = [
    { value: "300%", label: "Average ROI Increase" },
    { value: "2.5x", label: "Lead Generation Growth" },
    { value: "85%", label: "Client Retention Rate" },
    { value: "50+", label: "Successful Campaigns" },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left">
              <Badge className="mb-6" variant="secondary">
                Digital Marketing
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                Strategic Marketing That Delivers Results
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
                We create data-driven marketing campaigns that amplify your brand, engage your audience, and drive
                measurable business growth across all digital channels.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">Get a Free Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">See Case Studies</Link>
                </Button>
              </div>
            </AnimateInView>
            <AnimateInView direction="right" scale>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src="/digital-marketing-dashboard.jpg"
                  alt="Digital marketing dashboard"
                  className="h-full w-full object-cover"
                />
              </div>
            </AnimateInView>
          </div>
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

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our Marketing Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Comprehensive digital marketing solutions for modern businesses
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <AnimateInView key={index} delay={index * 0.1}>
                  <Card className="h-full transition-all hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-foreground">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </AnimateInView>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left" scale>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img src="/marketing-strategy.jpg" alt="Marketing strategy" className="h-full w-full object-cover" />
              </div>
            </AnimateInView>
            <AnimateInView direction="right">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Why Choose Our Marketing Services?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                In today's competitive digital landscape, effective marketing is essential for business growth. We
                combine strategy, creativity, and data to deliver campaigns that work.
              </p>
              <StaggerContainer className="space-y-3">
                {benefits.map((benefit, index) => (
                  <AnimateInView key={index} delay={index * 0.1} direction="left">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </AnimateInView>
                ))}
              </StaggerContainer>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground md:py-32">
        <div className="container px-4">
          <AnimateInView scale className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Ready to Grow Your Business?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              Let's create a custom marketing strategy that drives real results for your business.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Schedule a Strategy Call</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
