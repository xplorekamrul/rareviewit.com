"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "hello@creative.agency",
      link: "mailto:hello@creative.agency",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Creative Street, San Francisco, CA 94102",
      link: "#",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 9AM - 6PM PST",
      link: "#",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              Contact Us
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Let's Start a Conversation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              Have a project in mind? We'd love to hear about it. Get in touch and let's create something amazing
              together.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <AnimateInView direction="left">
              <h2 className="mb-6 text-3xl font-bold text-foreground">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input id="company" placeholder="Your Company" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Interested In</Label>
                  <select
                    id="service"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a service</option>
                    <option value="web-design">Web Design</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="seo">SEO Services</option>
                    <option value="app-development">App Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your project..." rows={6} required />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </AnimateInView>

            {/* Contact Information */}
            <AnimateInView direction="right">
              <h2 className="mb-6 text-3xl font-bold text-foreground">Get in Touch</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                We're here to answer your questions and discuss how we can help bring your vision to life. Reach out
                through any of these channels.
              </p>

              <StaggerContainer className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <AnimateInView key={index} delay={index * 0.1}>
                      <Card>
                        <CardContent className="flex items-start gap-4 p-6">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="mb-1 font-semibold text-foreground">{info.title}</h3>
                            {info.link !== "#" ? (
                              <a
                                href={info.link}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {info.details}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.details}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </AnimateInView>
                  )
                })}
              </StaggerContainer>

              <AnimateInView delay={0.4}>
                <Card className="mt-8 bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-bold">Quick Response Guarantee</h3>
                    <p className="text-primary-foreground/90">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </CardContent>
                </Card>
              </AnimateInView>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4">
          <AnimateInView scale>
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <MapPin className="mr-2 h-6 w-6" />
                <span>Map Location</span>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
