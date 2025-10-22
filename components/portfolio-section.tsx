"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimateInView } from "./animate-in-view"
import { StaggerContainer, staggerItem } from "./stagger-container"
import { motion } from "framer-motion"

export function PortfolioSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "/modern-ecommerce-website.png",
      tags: ["React", "Next.js", "Stripe"],
    },
    {
      title: "Brand Identity Design",
      category: "Branding",
      image: "/brand-identity-design-mockup.jpg",
      tags: ["Design", "Branding", "UI/UX"],
    },
    {
      title: "Mobile Banking App",
      category: "App Development",
      image: "/mobile-banking-app.png",
      tags: ["React Native", "FinTech", "iOS"],
    },
    {
      title: "SEO Campaign Success",
      category: "Digital Marketing",
      image: "/seo-analytics-dashboard.png",
      tags: ["SEO", "Analytics", "Growth"],
    },
  ]

  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container px-4">
        <AnimateInView className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Featured Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
            Explore our portfolio of successful projects and client transformations
          </p>
        </AnimateInView>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card className="group overflow-hidden transition-all hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
            </motion.div>
          ))}
        </StaggerContainer>

        <AnimateInView delay={0.4} className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/portfolio">View All Projects</Link>
          </Button>
        </AnimateInView>
      </div>
    </section>
  )
}
