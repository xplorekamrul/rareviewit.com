// app/digital-marketing/DigitalMarketingClient.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimateInView } from "@/components/animate-in-view";
import { StaggerContainer } from "@/components/stagger-container";
import { marketing } from "@/data/corpus";
import {
  CheckCircle2,
  Users,
  Target,
  TrendingUp,
  BarChart
} from "lucide-react";

const iconMap = {
  users: Users,
  target: Target,
  trendingUp: TrendingUp,
  barChart: BarChart,
} as const;

export default function DigitalMarketingClient() {
  const { hero, stats, services, benefits, benefitsMedia, cta } = marketing;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left">
              <Badge className="mb-6" variant="secondary">
                {hero.badge}
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                {hero.title}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
                {hero.description}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href={hero.primaryCta.href}>{hero.primaryCta.text}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={hero.secondaryCta.href}>{hero.secondaryCta.text}</Link>
                </Button>
              </div>
            </AnimateInView>
            <AnimateInView direction="right" >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={hero.media.src || "/placeholder.svg"}
                  alt={hero.media.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/20 py-12 md:py-16">
        <div className="container px-4">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <AnimateInView key={stat.label} delay={index * 0.1} className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground md:text-base">{stat.label}</div>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
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
              const Icon = iconMap[service.iconId as keyof typeof iconMap];
              return (
                <AnimateInView key={service.title} delay={index * 0.1}>
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
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left" >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={benefitsMedia.src || "/placeholder.svg"}
                  alt={benefitsMedia.alt}
                  className="h-full w-full object-cover"
                />
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
                  <AnimateInView key={benefit} delay={index * 0.1} direction="left">
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

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground md:py-32">
        <div className="container px-4">
          <AnimateInView  className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              {cta.subtitle}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href={cta.href}>Schedule a Strategy Call</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  );
}
