"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
type Project = {
   title: string
   category: "Web Design" | "App Development" | "Branding" | "Digital Marketing"
   description: string
   image: string
   tags: ReadonlyArray<string>  
   results: string
   href: string
 }
 
 type PortfolioData = {
   hero: { badge: string; title: string; description: string }
   filters: ReadonlyArray<"All" | "Web Design" | "App Development" | "Branding" | "Digital Marketing">
   projects: ReadonlyArray<Project>  
   cta: { title: string; description: string; button: { text: string; href: string } }
 }

export default function PortfolioClient({ data }: { data: PortfolioData }) {
  const { hero, filters, projects, cta } = data
  const [activeCategory, setActiveCategory] = useState<(typeof filters)[number]>("All")

  const filtered = useMemo(
    () => (activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory)),
    [activeCategory, projects]
  )

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
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {hero.description}
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border py-8">
        <div className="container px-4">
          <AnimateInView>
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map(cat => (
                <Button
                  key={cat}
                  variant={cat === activeCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {filtered.map((project, index) => (
              <AnimateInView key={project.title} delay={index * 0.1} direction="up">
                <Card className="group overflow-hidden transition-all hover:shadow-xl h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <Button
                      asChild
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Link href={project.href}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Project
                      </Link>
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-accent">{project.category}</span>
                      <Badge variant="secondary">{project.results}</Badge>
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground">{project.title}</h3>
                    <p className="mb-4 text-muted-foreground leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              {cta.description}
            </p>
            <Button size="lg" asChild>
              <Link href={cta.button.href}>{cta.button.text}</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
