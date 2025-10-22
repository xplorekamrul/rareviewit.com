"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Smartphone, Code, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function AppDevelopmentPage() {
  const services = [
    {
      icon: Smartphone,
      title: "Native Apps",
      description: "iOS and Android apps built with native technologies for optimal performance.",
    },
    {
      icon: Code,
      title: "Cross-Platform",
      description: "React Native apps that work seamlessly across multiple platforms.",
    },
    {
      icon: Zap,
      title: "Web Apps",
      description: "Progressive web apps that combine the best of web and mobile.",
    },
    {
      icon: Shield,
      title: "Maintenance",
      description: "Ongoing support, updates, and optimization for your applications.",
    },
  ]

  const benefits = [
    "Reach customers on their preferred devices",
    "Increase engagement with push notifications",
    "Provide seamless offline functionality",
    "Leverage device features like camera and GPS",
    "Build brand loyalty with a dedicated app",
    "Generate additional revenue streams",
  ]

  const technologies = ["React Native", "Swift", "Kotlin", "Flutter", "Node.js", "Firebase", "AWS", "GraphQL"]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left">
              <Badge className="mb-6" variant="secondary">
                App Development
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                Custom Apps That Users Love
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
                We build powerful, scalable mobile and web applications that deliver exceptional user experiences and
                drive business growth. From concept to launch and beyond.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">Discuss Your App Idea</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">See Our Apps</Link>
                </Button>
              </div>
            </AnimateInView>
            <AnimateInView direction="right" scale>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img src="/app-development.jpg" alt="App development" className="h-full w-full object-cover" />
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our Development Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Full-stack app development for all platforms
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <AnimateInView key={index} delay={index * 0.1}>
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
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left" scale>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img src="/mobile-app-ui.jpg" alt="Mobile app UI" className="h-full w-full object-cover" />
              </div>
            </AnimateInView>
            <AnimateInView direction="right">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Why Your Business Needs a Mobile App
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                Mobile apps provide a direct channel to your customers, offering enhanced engagement and functionality
                that websites alone can't match.
              </p>
              <StaggerContainer className="space-y-3">
                {benefits.map((benefit, index) => (
                  <AnimateInView key={index} delay={index * 0.1} direction="left">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </AnimateInView>
                ))}
              </StaggerContainer>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Technologies We Use
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              We leverage the latest technologies to build robust, scalable applications
            </p>
          </AnimateInView>

          <StaggerContainer className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <AnimateInView key={index} delay={index * 0.05} scale>
                <Badge variant="secondary" className="px-6 py-3 text-base">
                  {tech}
                </Badge>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our Development Process
            </h2>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Discovery", description: "Define requirements and project scope" },
              { step: "02", title: "Design", description: "Create intuitive UI/UX designs" },
              { step: "03", title: "Development", description: "Build and test your application" },
              { step: "04", title: "Launch & Support", description: "Deploy and provide ongoing maintenance" },
            ].map((phase, index) => (
              <AnimateInView key={index} delay={index * 0.1}>
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-4xl font-bold text-primary">{phase.step}</div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
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
          <AnimateInView scale className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Ready to Build Your App?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              Let's turn your app idea into reality. Schedule a consultation to discuss your project.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
