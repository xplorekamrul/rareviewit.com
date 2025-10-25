// app/app-development/AppDevelopmentClient.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimateInView } from "@/components/animate-in-view";
import { StaggerContainer } from "@/components/stagger-container";
import { appDev } from "@/data/corpus";
import {
  CheckCircle2,
  Smartphone,
  Code,
  Zap,
  Shield
} from "lucide-react";

const iconMap = {
  smartphone: Smartphone,
  code: Code,
  zap: Zap,
  shield: Shield,
} as const;

export default function AppDevelopmentClient() {
  const { hero, services, benefits, benefitMedia, technologies, process, cta } = appDev;

  return (
    <>
      {/* Hero Section */}
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

      {/* Services */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our Development Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Full-stack app development for all platforms
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
                  src={benefitMedia.src || "/placeholder.svg"}
                  alt={benefitMedia.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </AnimateInView>
            <AnimateInView direction="right">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Why Your Business Needs a Mobile App
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                Mobile apps provide a direct channel to your customers, offering enhanced engagement and functionality
                that websites alone can't match.
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

      {/* Technologies */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Technologies We Use
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              We leverage the latest technologies to build robust, scalable applications
            </p>
          </AnimateInView>

          <StaggerContainer className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <AnimateInView key={tech} delay={index * 0.05} >
                <Badge variant="secondary" className="px-6 py-3 text-base">
                  {tech}
                </Badge>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our Development Process
            </h2>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((phase, index) => (
              <AnimateInView key={phase.step} delay={index * 0.1}>
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-4xl font-bold text-primary">{phase.step}</div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
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
          <AnimateInView  className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              {cta.subtitle}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href={cta.href}>{cta.buttonText}</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  );
}
