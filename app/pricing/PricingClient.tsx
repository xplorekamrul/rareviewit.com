"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

type BillingCycle = "onetime" | "monthly"

type PricingPackage = {
  name: string
  priceOneTime: number
  priceMonthly: number
  description: string
  features: ReadonlyArray<string>
  notIncluded: ReadonlyArray<string>
  popular: boolean
}

type Addon = {
  name: string
  price: number
  description: string
}

type FAQItem = { question: string; answer: string }

type PricingData = {
  hero: {
    badge: string
    title: string
    description: string
    primaryCta: { text: string; href: string }
    secondaryCta: { text: string; href: string }
  }
  toggle: {
    labels: { onetime: string; monthly: string }
    defaultCycle: BillingCycle
  }
  packages: ReadonlyArray<PricingPackage>
  addons: ReadonlyArray<Addon>
  faqSection: {
    title: string
    items: ReadonlyArray<FAQItem>
  }
  cta: {
    title: string
    description: string
    button: { text: string; href: string }
  }
}

export default function PricingClient({ data }: { data: PricingData }) {
  const { hero, toggle, packages, addons, faqSection, cta } = data
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(toggle.defaultCycle)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-6" variant="secondary">
              {hero.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {hero.description}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild>
                <Link href={hero.primaryCta.href}>{hero.primaryCta.text}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.text}</Link>
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
                {toggle.labels.onetime}
              </button>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {toggle.labels.monthly}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg, index) => {
              const price = billingCycle === "onetime" ? pkg.priceOneTime : pkg.priceMonthly
              return (
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
                        <span className="text-4xl font-bold text-foreground">${price}</span>
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
              )
            })}
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
                {faqSection.title}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {faqSection.items.map((faq, index) => (
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
              {cta.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              {cta.description}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href={cta.button.href}>{cta.button.text}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
