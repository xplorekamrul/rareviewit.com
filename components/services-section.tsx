"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, TrendingUp, Search, Smartphone, ArrowRight } from "lucide-react"
import { AnimateInView } from "./animate-in-view"
import { StaggerContainer, staggerItem } from "./stagger-container"
import { motion } from "framer-motion"

export function ServicesSection() {
  const services = [
    {
      icon: Palette,
      title: "Web Design",
      description: "Beautiful, responsive websites that captivate your audience and drive conversions.",
      href: "/services/web-design",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Strategic campaigns that amplify your brand and deliver measurable results.",
      href: "/services/digital-marketing",
    },
    {
      icon: Search,
      title: "SEO Services",
      description: "Boost your visibility and rank higher in search results with our proven strategies.",
      href: "/services/seo",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Custom mobile and web applications built with cutting-edge technology.",
      href: "/services/app-development",
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <AnimateInView className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Our Services
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </AnimateInView>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div key={index} variants={staggerItem}>
                <Card className="group h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" asChild className="group/btn">
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
