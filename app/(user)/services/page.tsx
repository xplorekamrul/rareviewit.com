// app/services/page.tsx (Server Component)
import { AnimateInView } from "@/components/animate-in-view"
import ServicesSection from "@/components/services-section"
import { StaggerContainer } from "@/components/stagger-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { services } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import Link from "next/link"

// --- Metadata (spread keywords to avoid readonly -> mutable issues)
export const metadata = generateSEOMetadata({
  title: services.meta.title,
  description: services.meta.description,
  path: services.meta.path,
  ogImage: services.meta.ogImage,
  keywords: [...services.meta.keywords],
})

export default function ServicesPage() {
  const { hero, process, cta } = services

  return (
    <>
      {/* Hero (server-rendered) */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-5 md:py-10">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <AnimateInView direction="none" delay={0.1}>
              <Badge className="mb-6" variant="secondary">
                {hero.badge}
              </Badge>
            </AnimateInView>
            <AnimateInView direction="none" delay={0.2}>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                {hero.title}
              </h1>
            </AnimateInView>
            <AnimateInView direction="none" delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
                {hero.subtitle}
              </p>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Services Section - Database-driven with order sorting */}
      <ServicesSection />

      {/* Process Section */}
      <section className="bg-muted/30 py-5 md:py-10">
        <div className="container px-4">
          <div className="mb-12 text-center md:mb-16">
            <AnimateInView direction="none">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                {process.title}
              </h2>
            </AnimateInView>
            <AnimateInView direction="none" delay={0.1}>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
                {process.subtitle}
              </p>
            </AnimateInView>
          </div>

          <StaggerContainer className="grid gap-8 md:grid-cols-4">
            {process.steps.map((step, index) => (
              <AnimateInView key={step.title} direction="up" delay={index * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-4xl font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 md:py-10">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <AnimateInView direction="none">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                {cta.title}
              </h2>
            </AnimateInView>
            <AnimateInView direction="none" delay={0.1}>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
                {cta.subtitle}
              </p>
            </AnimateInView>
            <AnimateInView direction="none" delay={0.2}>
              <Button size="lg" asChild>
                <Link href={cta.href}>{cta.buttonText}</Link>
              </Button>
            </AnimateInView>
          </div>
        </div>
      </section>
    </>
  )
}
