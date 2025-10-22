"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import { useState } from "react"

export default function PortfolioPage() {
  const categories = ["All", "Web Design", "App Development", "Branding", "Digital Marketing"]
  const [activeCategory, setActiveCategory] = useState("All")

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Design",
      description:
        "Complete redesign and development of a modern e-commerce platform with 300% increase in conversions.",
      image: "/portfolio-ecommerce.png",
      tags: ["React", "Next.js", "Stripe", "Tailwind"],
      results: "+300% Conversions",
    },
    {
      title: "FinTech Mobile App",
      category: "App Development",
      description: "Secure mobile banking application serving 100K+ active users with seamless UX.",
      image: "/portfolio-fintech.png",
      tags: ["React Native", "Node.js", "Security"],
      results: "100K+ Users",
    },
    {
      title: "Brand Identity Refresh",
      category: "Branding",
      description: "Complete brand overhaul including logo, guidelines, and marketing materials for a tech startup.",
      image: "/portfolio-branding.png",
      tags: ["Design", "Branding", "Strategy"],
      results: "Award Winner",
    },
    {
      title: "SaaS Dashboard",
      category: "Web Design",
      description: "Analytics dashboard with real-time data visualization and intuitive user experience.",
      image: "/portfolio-saas.png",
      tags: ["React", "D3.js", "API Integration"],
      results: "98% Satisfaction",
    },
    {
      title: "SEO Campaign",
      category: "Digital Marketing",
      description: "Comprehensive SEO strategy resulting in first-page rankings for 50+ keywords.",
      image: "/portfolio-seo.png",
      tags: ["SEO", "Content", "Analytics"],
      results: "+500% Traffic",
    },
    {
      title: "Healthcare Portal",
      category: "Web Design",
      description: "HIPAA-compliant patient portal with appointment scheduling and telemedicine features.",
      image: "/portfolio-healthcare.png",
      tags: ["Next.js", "Security", "Compliance"],
      results: "HIPAA Certified",
    },
  ]

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              Our Work
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Projects That Drive Results
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              Explore our portfolio of successful digital transformations and see how we've helped businesses achieve
              their goals.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b border-border py-8">
        <div className="container px-4">
          <AnimateInView>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={category === activeCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {filteredProjects.map((project, index) => (
              <AnimateInView key={index} delay={index * 0.1} direction="up">
                <Card className="group overflow-hidden transition-all hover:shadow-xl h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Project
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
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">
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

      {/* CTA Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center" scale>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Let's Create Something Amazing
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              Ready to see your project featured in our portfolio? Let's discuss your vision.
            </p>
            <Button size="lg" asChild>
              <a href="/contact">Start Your Project</a>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
