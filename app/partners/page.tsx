"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Target, GraduationCap, Quote } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PartnersPage() {
  const partners = [
    { name: "Google Partner", logo: "/partner-google.png" },
    { name: "Shopify Expert", logo: "/partner-shopify.png" },
    { name: "Clutch Rated", logo: "/partner-clutch.png" },
    { name: "Mailchimp Partner", logo: "/partner-mailchimp.png" },
    { name: "Stripe Integration", logo: "/partner-stripe.png" },
    { name: "AWS Partner", logo: "/partner-aws.png" },
  ]

  const partnershipModels = [
    {
      icon: DollarSign,
      title: "White-Label Partner",
      description:
        "Offer our services under your brand. Perfect for agencies looking to expand their service offerings.",
      benefits: ["Your branding", "Flexible pricing", "Dedicated support", "Priority delivery"],
    },
    {
      icon: Target,
      title: "Tech Integration Partner",
      description: "Integrate your platform or service with our solutions for mutual client benefit.",
      benefits: ["Co-marketing", "Technical support", "Joint case studies", "Revenue sharing"],
    },
    {
      icon: GraduationCap,
      title: "Referral Partner",
      description: "Earn commission by referring clients to our services. Simple and rewarding.",
      benefits: ["15% commission", "Custom dashboard", "Monthly payouts", "Marketing materials"],
    },
  ]

  const testimonials = [
    {
      quote: "Working with this team has been a game-changer for our agency. Their white-label services are top-notch.",
      author: "Jennifer Smith",
      company: "Digital Solutions Co",
      logo: "/partner-testimonial-1.png",
    },
    {
      quote: "The referral program is straightforward and the commissions are paid on time, every time.",
      author: "Robert Johnson",
      company: "Marketing Pro",
      logo: "/partner-testimonial-2.png",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-6" variant="secondary">
              Partners & Affiliates
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Trusted by Industry Leaders & Growth Partners
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              We collaborate with top platforms, agencies, and professionals to bring added value to our clients.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/contact">Become a Partner</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#affiliate">Affiliate Program Info</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="border-y border-border bg-muted/20 py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Our Partners</h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="group relative h-20 w-full transition-all hover:scale-110">
                  <img
                    src={partner.logo || "/placeholder.svg?height=80&width=120"}
                    alt={partner.name}
                    className="h-full w-full object-contain opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Program */}
      <section id="affiliate" className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Affiliate Program Overview
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Join our affiliate program and earn generous commissions
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-8 md:p-12">
                <div className="grid gap-8 md:grid-cols-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="mb-4 text-4xl font-bold text-primary">15%</div>
                    <div className="text-sm text-muted-foreground">Commission Rate</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="mb-4 text-4xl font-bold text-primary">30 Days</div>
                    <div className="text-sm text-muted-foreground">Cookie Duration</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="mb-4 text-4xl font-bold text-primary">Monthly</div>
                    <div className="text-sm text-muted-foreground">Payout Schedule</div>
                  </motion.div>
                </div>
                <div className="mt-8 text-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">Apply as an Affiliate</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Partnership Models
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Choose the partnership model that fits your business
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {partnershipModels.map((model, index) => {
              const Icon = model.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-foreground">{model.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{model.description}</p>
                      <ul className="space-y-2">
                        {model.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="mt-6 w-full">
                        <Link href="/contact">Get Started</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              What Our Partners Say
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <Quote className="mb-4 h-8 w-8 text-accent/20" />
                    <p className="mb-6 text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                        <img
                          src={testimonial.logo || "/placeholder.svg?height=48&width=48"}
                          alt={testimonial.company}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">Let's Grow Together</h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              Join our network of successful partners and start earning today
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Apply Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
