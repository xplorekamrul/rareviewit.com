"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type FAQItem = { question: string; answer: string }
type FAQData = {
  hero: { badge: string; title: string; description: string; ctaText: string; ctaHref: string }
  categories: string[]
  faqsByCategory: Record<string, FAQItem[]>
  cta: {
    title: string
    description: string
    primary: { text: string; href: string }
    secondary: { text: string; href: string }
  }
}

export default function FAQClient({ data }: { data: FAQData }) {
  const { hero, categories, faqsByCategory, cta } = data
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "General")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = faqsByCategory[activeCategory] ?? []

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
            <Badge className="mb-6" variant="secondary">{hero.badge}</Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {hero.description}
            </p>
            <Button asChild className="mt-8">
              <Link href={hero.ctaHref}>{hero.ctaText}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-border bg-muted/20 py-8">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveCategory(category)
                  setOpenIndex(null)
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                  >
                    <h3 className="font-bold text-foreground pr-4">{faq.question}</h3>
                    <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="px-6 pb-6 pt-0">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              {cta.description}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href={cta.primary.href}>{cta.primary.text}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={cta.secondary.href}>{cta.secondary.text}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
