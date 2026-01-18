// src/app/about/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import Image from "next/image"
import { about, FALLBACK_IMAGE } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"

// ---- Metadata sourced from corpus
export const metadata = generateSEOMetadata({
  title: about.meta.title,
  description: about.meta.description,
  path: about.meta.path,
  openGraph: {
    images: [{ url: about.meta.ogImage || FALLBACK_IMAGE }],
  },
})

function withFallback(src?: string) {
  return src && src.trim().length > 0 ? src : FALLBACK_IMAGE
}

export default function AboutPage() {
  const { hero, mission, valuesBlock, values, teamBlock, team, cta } = about

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

      {/* Mission Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                {mission.title}
              </h2>
              <p className="mb-4 text-lg text-muted-foreground leading-relaxed">
                {mission.descriptionOne}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {mission.descriptionTwo}
              </p>
            </AnimateInView>
            <AnimateInView direction="right" className="relative aspect-video overflow-hidden rounded-lg">
              <div className="h-full w-full">
                <Image
                  src={withFallback(mission.image)}
                  alt={mission.alt || "Mission image"}
                  fill
                />
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {valuesBlock.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {valuesBlock.description}
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <AnimateInView key={index} delay={index * 0.1}>
                  <Card className="text-center h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-foreground">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </AnimateInView>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {teamBlock.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {teamBlock.description}
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <AnimateInView key={index} delay={index * 0.1} direction="up">
                <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                  <div className="relative aspect-square overflow-hidden">
                    <div className="h-full w-full object-cover transition-transform duration-300 hover:scale-105">
                      <Image
                        src={withFallback(member.image)}
                        alt={member.name}
                        fill
                      />
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-1 text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="mb-2 text-sm font-medium text-accent">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
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
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground text-balance">
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
