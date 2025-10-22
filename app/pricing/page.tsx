"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "onetime">("onetime")

  const packages = [
    {
      name: "Starter",
      price: billingCycle === "onetime" ? 499 : 99,
      description: "Perfect for small businesses and startups",
      features: [
        "5-Page Website",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form",
        "2 Revisions",
        "30-Day Support",
      ],
      notIncluded: ["E-commerce", "Custom Animations", "Advanced Analytics"],
      popular: false,
    },
    {
      name: "Growth",
      price: billingCycle === "onetime" ? 1299 : 249,
      description: "Ideal for growing businesses",
      features: [
        "10-Page Website",
        "Advanced Responsive Design",
        "Complete SEO Package",
        "Contact & Lead Forms",
        "5 Revisions",
        "90-Day Support",
        "Performance Optimization",
        "Analytics Integration",
      ],
      notIncluded: ["E-commerce", "Custom CMS"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: billingCycle === "onetime" ? 2999 : 599,
      description: "For established businesses with complex needs",
      features: [
        "Unlimited Pages",
        "Premium Design System",
        "Advanced SEO & Marketing",
        "Custom Forms & Integrations",
        "Unlimited Revisions",
        "1-Year Support",
        "Performance Optimization",
        "Advanced Analytics",
        "E-commerce Ready",
        "Custom CMS",
        "Priority Support",
      ],
      notIncluded: [],
      popular: false,
    },
  ]

  const addons = [
    { name: "Logo Design", price: 299, description: "Professional brand identity" },
    { name: "Landing Page", price: 499, description: "High-converting single page" },
    { name: "Speed Optimization", price: 199, description: "Performance tuning" },
    { name: "Monthly SEO", price: 399, description: "Ongoing optimization" },
  ]

  const faqs = [
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment plans for projects over $1,000. Contact us to discuss options.",
    },
    {
      question: "What's your refund policy?",
      answer: "We offer refunds if work hasn't begun. Partial refunds are evaluated case-by-case.",
    },
    {
      question: "Are prices negotiable?",
      answer: "We're happy to discuss custom packages that fit your budget and needs.",
    },
    {
      question: "Do you include hosting/domain?",
      answer: "Hosting and domain are separate. We can recommend providers or manage it for you.",
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
              Pricing
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Flexible Pricing That Fits Your Business
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              Choose a package or request a custom quote — we scale to your needs.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Get a Custom Quote</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="border-b border-border py-8">
        <div className="container px-4">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-border bg-muted/30 p-1">
              <button
                onClick={() => setBillingCycle("onetime")}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "onetime" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`relative h-full transition-all hover:shadow-xl ${
                    pkg.popular ? "border-primary shadow-lg" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">${pkg.price}</span>
                      <span className="text-muted-foreground">
                        {billingCycle === "monthly" ? "/month" : " one-time"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 shrink-0 text-accent" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {pkg.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 opacity-50">
                          <X className="h-5 w-5 shrink-0 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      <Link href="/contact">Select Plan</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
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
              Optional Add-Ons
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Enhance your package with these additional services
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-2 text-xl font-bold text-foreground">{addon.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{addon.description}</p>
                    <div className="text-2xl font-bold text-primary">${addon.price}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Payment Terms & FAQ
              </h2>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-bold text-foreground">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Let's Launch Your Project with Confidence
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              Ready to get started? Schedule a call or request a custom quote today.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
