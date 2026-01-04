// components/home/PortfolioSection.tsx
"use client"

import { AnimateInView } from "@/components/animate-in-view"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

type Project = { title: string; category: string; image: string; tags: readonly string[] }
type PortfolioBlock = {
  title: string
  subtitle: string
  cta: { label: string; href: string }
  projects: readonly Project[]
}

export default function PortfolioSection({ data }: { data: PortfolioBlock }) {
  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container px-4">
        <AnimateInView className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            {data.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
            {data.subtitle}
          </p>
        </AnimateInView>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {data.projects.map((project, index) => (
            <div key={index}>
              <Card animated={false} className="group overflow-hidden transition-all hover:shadow-xl pt-0 p-1.5">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-10" />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2 text-sm font-medium text-accent">{project.category}</div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <AnimateInView delay={0.2} className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href={data.cta.href}>{data.cta.label}</Link>
          </Button>
        </AnimateInView>
      </div>
    </section>
  )
}
