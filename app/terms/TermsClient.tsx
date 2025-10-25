"use client"

import { Badge } from "@/components/ui/badge"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

type Section = { title: string; paragraphs: ReadonlyArray<string> }

type TermsData = {
  hero: { badge: string; title: string; lead: string }
  lastUpdated: string
  sections: ReadonlyArray<Section>
  agreement: { title: string; text: string }
}

export default function TermsClient({ data }: { data: TermsData }) {
  const { hero, lastUpdated, sections, agreement } = data

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              {hero.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-balance">
              Last Updated: {lastUpdated}
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Lead */}
      <section className="py-8">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <AnimateInView>
              <div className="mb-12 rounded-lg bg-muted/30 p-6 md:p-8">
                <p className="text-lg leading-relaxed text-foreground">
                  {hero.lead}
                </p>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <StaggerContainer className="space-y-12">
              {sections.map((section, index) => (
                <AnimateInView key={section.title} delay={index * 0.1}>
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">{section.title}</h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((p, i) => (
                        <p key={i} className="text-muted-foreground leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </AnimateInView>
              ))}
            </StaggerContainer>

            <AnimateInView delay={0.3}>
              <div className="mt-12 rounded-lg border border-border bg-card p-6 md:p-8">
                <h3 className="mb-4 text-xl font-bold text-foreground">{agreement.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {agreement.text}
                </p>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>
    </>
  )
}
