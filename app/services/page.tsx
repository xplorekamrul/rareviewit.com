import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, TrendingUp, Search, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Our Services - Comprehensive Digital Solutions",
  description:
    "From design to development, marketing to optimization - we provide end-to-end digital services tailored to your business needs.",
  keywords: ["web design", "digital marketing", "SEO services", "app development", "digital solutions"],
  path: "/services",
})

export default function ServicesPage() {
  const services = [
    {
      icon: Palette,
      title: "Web Design",
      description: "Create stunning, user-friendly websites that captivate your audience and drive conversions.",
      features: ["Responsive Design", "UI/UX Optimization", "Brand Integration", "Performance Focused"],
      href: "/services/web-design",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Strategic campaigns that amplify your brand reach and deliver measurable business results.",
      features: ["Social Media Marketing", "PPC Campaigns", "Email Marketing", "Analytics & Reporting"],
      href: "/services/digital-marketing",
    },
    {
      icon: Search,
      title: "SEO Services",
      description: "Boost your visibility and rank higher in search results with our proven SEO strategies.",
      features: ["Keyword Research", "On-Page SEO", "Link Building", "Technical SEO"],
      href: "/services/seo",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Custom mobile and web applications built with cutting-edge technology and best practices.",
      features: ["iOS & Android", "Cross-Platform", "API Integration", "Maintenance & Support"],
      href: "/services/app-development",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <AnimateInView variant="fadeIn" delay={0.1}>
              <Badge className="mb-6" variant="secondary">
                Our Services
              </Badge>
            </AnimateInView>
            <AnimateInView variant="fadeIn" delay={0.2}>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                Comprehensive Digital Solutions
              </h1>
            </AnimateInView>
            <AnimateInView variant="fadeIn" delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
                From design to development, marketing to optimization - we provide end-to-end digital services tailored
                to your business needs.
              </p>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <StaggerContainer className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <AnimateInView key={index} variant="slideUp" delay={index * 0.1}>
                  <Card className="group transition-all hover:shadow-xl h-full">
                    <CardHeader>
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button asChild className="w-full group/btn">
                        <Link href={service.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimateInView>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="mb-12 text-center md:mb-16">
            <AnimateInView variant="fadeIn">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Our Process
              </h2>
            </AnimateInView>
            <AnimateInView variant="fadeIn" delay={0.1}>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
                A proven methodology that delivers results
              </p>
            </AnimateInView>
          </div>

          <StaggerContainer className="grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Discovery", description: "We learn about your business, goals, and challenges" },
              { step: "02", title: "Strategy", description: "We develop a customized plan tailored to your needs" },
              { step: "03", title: "Execution", description: "We bring your vision to life with expert craftsmanship" },
              { step: "04", title: "Optimization", description: "We continuously improve and refine for best results" },
            ].map((phase, index) => (
              <AnimateInView key={index} variant="slideUp" delay={index * 0.1}>
                <Card className="h-full">
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
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <AnimateInView variant="fadeIn">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Ready to Get Started?
              </h2>
            </AnimateInView>
            <AnimateInView variant="fadeIn" delay={0.1}>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
                Let's discuss which services are right for your business and create a custom solution.
              </p>
            </AnimateInView>
            <AnimateInView variant="scaleIn" delay={0.2}>
              <Button size="lg" asChild>
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </AnimateInView>
          </div>
        </div>
      </section>
    </>
  )
}
