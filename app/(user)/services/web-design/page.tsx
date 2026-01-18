// app/services/web-design/page.tsx
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Palette, Layout, Smartphone, Zap } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import { webDesign, FALLBACK_IMAGE } from "@/data/corpus"

// ---- Metadata (server)
export const metadata = generateSEOMetadata({
  title: webDesign.meta.title,
  description: webDesign.meta.description,
  path: webDesign.meta.path,
  ogImage: webDesign.meta.ogImage,
  keywords: webDesign.meta.keywords,
})

const ICONS = {
  layout: Layout,
  palette: Palette,
  smartphone: Smartphone,
  zap: Zap,
} as const

export default function WebDesignPage() {
  const { hero, showcaseImage, features, benefits, process, cta } = webDesign

  return (
    <>
      {/* Hero Section */}
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

            <AnimateInView direction="right" className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={showcaseImage.src || FALLBACK_IMAGE}
                alt={showcaseImage.alt}
                className="h-full w-full object-cover"
              />
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {webDesign.featuresBlock.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {webDesign.featuresBlock.subtitle}
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = ICONS[feature.iconId as keyof typeof ICONS] || Layout
              return (
                <AnimateInView key={feature.title} delay={index * 0.1} >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimateInView direction="left">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                {webDesign.benefitsBlock.title}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                {webDesign.benefitsBlock.subtitle}
              </p>
              <StaggerContainer className="space-y-3">
                {benefits.map((benefit, index) => (
                  <AnimateInView key={benefit} delay={index * 0.05} direction="left">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </AnimateInView>
                ))}
              </StaggerContainer>
            </AnimateInView>

            <AnimateInView direction="right" className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={webDesign.benefitsImage.src || FALLBACK_IMAGE}
                alt={webDesign.benefitsImage.alt}
                className="h-full w-full object-cover"
              />
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {webDesign.processBlock.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {webDesign.processBlock.subtitle}
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <AnimateInView key={step.title} delay={index * 0.1} direction="up">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-3 text-3xl font-bold text-primary">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center" >
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
  )
}
