// app/seo/SEOClient.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimateInView } from "@/components/animate-in-view";
import { StaggerContainer } from "@/components/stagger-container";
import { seo } from "@/data/corpus";
import {
  CheckCircle2,
  Search as SearchIcon,
  FileText as FileTextIcon,
  Link as LinkLucide,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";

const iconMap = {
  search: SearchIcon,
  fileText: FileTextIcon,
  link: LinkLucide,
  trendingUp: TrendingUpIcon,
} as const;

export default function SEOClient() {
  const { hero, results, services, benefits, benefitsMedia, cta } = seo;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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

      {/* Results */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Real Results for Real Businesses
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              See how we've helped businesses achieve remarkable SEO success
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {results.map((r, index) => (
              <AnimateInView key={`${r.metric}-${index}`} delay={index * 0.1} >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-2 text-3xl font-bold text-primary">{r.value}</div>
                    <div className="mb-1 font-semibold text-foreground">{r.metric}</div>
                    <div className="text-sm text-muted-foreground">{r.client}</div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Comprehensive SEO Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Everything you need to succeed in search engines
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
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimateInView direction="left">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Why SEO is Essential for Your Business
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                SEO is one of the most cost-effective marketing strategies with long-lasting results. Unlike paid ads,
                organic rankings continue to drive traffic and leads over time.
              </p>
              <StaggerContainer className="space-y-3">
                {benefits.map((benefit, index) => (
                  <AnimateInView key={benefit} delay={index * 0.1} direction="left">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </AnimateInView>
                ))}
              </StaggerContainer>
            </AnimateInView>
            <AnimateInView direction="right" >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={benefitsMedia.src || "/placeholder.svg"}
                  alt={benefitsMedia.alt}
                  className="h-full w-full object-cover"
                />
              </div>
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
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground text-balance">
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
