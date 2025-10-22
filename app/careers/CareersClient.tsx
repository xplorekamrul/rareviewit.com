"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import { careers } from "@/data/corpus"

export default function CareersClient() {
  const {
    hero,
    whySection,
    benefits,
    valuesSection,
    values,
    openingsSection,
    openings,
    cta,
  } = careers

  return (
    <>
      {/* Hero Section */}
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
              {hero.description}
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {whySection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {whySection.subtitle}
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <AnimateInView key={index} delay={index * 0.1}>
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {valuesSection.title}
            </h2>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <AnimateInView key={index} delay={index * 0.1} className="text-center">
                <h3 className="mb-2 text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {openingsSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {openingsSection.subtitle}
            </p>
          </AnimateInView>

          <StaggerContainer className="space-y-6">
            {openings.map((job, index) => (
              <AnimateInView key={index} delay={index * 0.1}>
                <Card className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="mb-2 text-2xl">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <Button asChild className="group/btn">
                        <Link href={`/careers/${job.slug}`}>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground md:py-32">
        <div className="container px-4">
          {/* FIX: removed unsupported `scale` prop */}
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              {cta.description}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href={cta.btnUrl}>{cta.btnText}</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
