import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Palette, Layout, Smartphone, Zap } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"

export const metadata = generateSEOMetadata({
  title: "Web Design Services - Beautiful Websites That Convert",
  description:
    "Professional web design services that create stunning, user-friendly websites to drive results for your business.",
  path: "/services/web-design",
})

export default function WebDesignPage() {
  const features = [
    {
      icon: Layout,
      title: "Responsive Design",
      description: "Beautiful layouts that work flawlessly across all devices and screen sizes.",
    },
    {
      icon: Palette,
      title: "Custom UI/UX",
      description: "Intuitive interfaces designed with your users and brand identity in mind.",
    },
    {
      icon: Smartphone,
      title: "Mobile-First",
      description: "Optimized for mobile devices to reach your audience wherever they are.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Lightning-fast load times and smooth interactions for better user experience.",
    },
  ]

  const benefits = [
    "Increase conversion rates by up to 200%",
    "Improve user engagement and time on site",
    "Build trust with professional design",
    "Stand out from competitors",
    "Reduce bounce rates significantly",
    "Enhance brand perception and credibility",
  ]

  const process = [
    { title: "Research & Discovery", description: "Understanding your brand, audience, and goals" },
    { title: "Wireframing", description: "Creating the blueprint for your website structure" },
    { title: "Design Mockups", description: "Crafting pixel-perfect visual designs" },
    { title: "Development", description: "Building your site with clean, modern code" },
    { title: "Testing & Launch", description: "Ensuring everything works perfectly before going live" },
    { title: "Support", description: "Ongoing maintenance and optimization" },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left">
              <Badge className="mb-6" variant="secondary">
                Web Design
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                Beautiful Websites That Drive Results
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
                We create stunning, user-friendly websites that not only look amazing but also convert visitors into
                customers. Every design is crafted with your business goals in mind.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">Start Your Project</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </AnimateInView>
            <AnimateInView direction="right" className="relative aspect-video overflow-hidden rounded-lg">
              <img src="/web-design-showcase.jpg" alt="Web design showcase" className="h-full w-full object-cover" />
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              What We Offer
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Comprehensive web design services tailored to your needs
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <AnimateInView key={index} delay={index * 0.1} scale>
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
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Why Invest in Professional Web Design?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                Your website is often the first impression potential customers have of your business. A professionally
                designed website can make all the difference.
              </p>
              <StaggerContainer className="space-y-3">
                {benefits.map((benefit, index) => (
                  <AnimateInView key={index} delay={index * 0.05} direction="left">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </AnimateInView>
                ))}
              </StaggerContainer>
            </AnimateInView>
            <AnimateInView direction="right" className="relative aspect-square overflow-hidden rounded-lg">
              <img src="/web-design-benefits.jpg" alt="Web design benefits" className="h-full w-full object-cover" />
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our Design Process
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              A structured approach that ensures exceptional results
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <AnimateInView key={index} delay={index * 0.1} direction="up">
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
          <AnimateInView className="mx-auto max-w-3xl text-center" scale>
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Ready to Transform Your Website?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              Let's create a website that truly represents your brand and drives business growth.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
