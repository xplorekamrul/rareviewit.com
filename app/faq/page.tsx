"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [activeCategory, setActiveCategory] = useState("General")

  const categories = ["General", "Web Design", "SEO", "App Development", "eCommerce", "Pricing & Payment"]

  const faqsByCategory = {
    General: [
      {
        question: "How do I start a project?",
        answer:
          "Simply contact us through our website, schedule a consultation, or give us a call. We'll discuss your needs and provide a custom proposal.",
      },
      {
        question: "What is your typical turnaround time?",
        answer:
          "Project timelines vary based on scope. A basic website takes 2-4 weeks, while complex applications can take 2-3 months. We'll provide a detailed timeline in your proposal.",
      },
      {
        question: "Do you work with clients remotely?",
        answer:
          "Yes! We work with clients worldwide. We use video calls, project management tools, and regular updates to ensure smooth collaboration.",
      },
    ],
    "Web Design": [
      {
        question: "Will my website work on phones?",
        answer: "All our websites are fully responsive and optimized for mobile, tablet, and desktop devices.",
      },
      {
        question: "Do you use WordPress, Webflow, or custom code?",
        answer:
          "We work with various platforms based on your needs. We specialize in custom Next.js applications, but also work with WordPress, Webflow, and other CMS platforms.",
      },
      {
        question: "Can I update the website myself after launch?",
        answer:
          "Yes! We provide training and documentation so you can make content updates. We also offer ongoing maintenance packages if you prefer us to handle updates.",
      },
    ],
    SEO: [
      {
        question: "How long until I see SEO results?",
        answer:
          "SEO is a long-term strategy. You may start seeing improvements in 3-6 months, with significant results typically appearing after 6-12 months of consistent optimization.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "We don't guarantee specific rankings as search algorithms constantly change. However, we guarantee our best efforts using proven strategies and transparent reporting.",
      },
      {
        question: "What's included in your SEO service?",
        answer:
          "Our SEO service includes keyword research, on-page optimization, technical SEO, content strategy, link building, and monthly performance reports.",
      },
    ],
    "App Development": [
      {
        question: "Do you build both iOS and Android?",
        answer:
          "Yes! We develop native apps for both platforms, as well as cross-platform solutions using React Native for cost-effective development.",
      },
      {
        question: "Will I own the source code?",
        answer: "Yes, upon final payment, you receive full ownership of the source code and all project files.",
      },
      {
        question: "Do you provide app store submission?",
        answer:
          "Yes, we handle the entire app store submission process for both Apple App Store and Google Play Store, including all required assets and descriptions.",
      },
    ],
    eCommerce: [
      {
        question: "Can I manage my store after launch?",
        answer:
          "We provide comprehensive training on managing products, orders, inventory, and customers through your e-commerce platform.",
      },
      {
        question: "Do you help with payment setup and shipping?",
        answer:
          "Yes, we integrate payment gateways (Stripe, PayPal, etc.) and configure shipping options based on your business needs.",
      },
      {
        question: "What e-commerce platforms do you use?",
        answer:
          "We work with Shopify, WooCommerce, custom Next.js solutions, and headless commerce platforms depending on your requirements.",
      },
    ],
    "Pricing & Payment": [
      {
        question: "Do you offer refunds?",
        answer:
          "Refunds are only issued if work hasn't begun. Partial refunds are evaluated case-by-case based on work completed.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept credit cards, bank transfers, PayPal, and for larger projects, we can arrange payment plans.",
      },
      {
        question: "How many design revisions are included?",
        answer: "Most packages include 2 major and 2 minor revisions. Additional revisions can be purchased if needed.",
      },
      {
        question: "Do you require a deposit?",
        answer:
          "Yes, we typically require a 50% deposit to begin work, with the balance due upon completion or according to agreed milestones.",
      },
    ],
  }

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
              FAQ
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Answers to Your Most Common Questions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              Got a question about our services, process, or pricing? We've answered the most frequent ones below.
            </p>
            <Button asChild className="mt-8">
              <Link href="/contact">Still Need Help? Chat With Us</Link>
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
              {faqsByCategory[activeCategory as keyof typeof faqsByCategory].map((faq, index) => (
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
                  <AnimatePresence>
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
              Didn't Find What You're Looking For?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              Our team is here to help answer any questions you have about our services.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Send Us a Message</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/booking">Schedule a Call</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
