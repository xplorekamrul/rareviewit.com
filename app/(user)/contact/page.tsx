import { AnimateInView } from "@/components/animate-in-view"
import { ContactForm } from "@/components/contact-form"
import { Badge } from "@/components/ui/badge"
import { contact } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react"

export const metadata = generateSEOMetadata({
  title: contact.meta.title,
  description: contact.meta.description,
  path: contact.meta.path,
  ogImage: contact.meta.ogImage,
})

export default function ContactPage() {
  const { hero, formSection, infoSection } = contact

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32" >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="container relative px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20" variant="secondary">
              {hero.badge}
            </Badge>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl text-balance leading-tight">
              Let's Start a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Conversation</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance max-w-2xl mx-auto">
              {hero.description}
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Contact Form - Takes 2 columns on desktop */}
            <AnimateInView direction="left" className="lg:col-span-2">
              <div className="sticky top-24" id="contact-form">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-foreground mb-3">{formSection.title}</h2>
                  <p className="text-muted-foreground text-lg">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ContactForm />
                </div>
              </div>
            </AnimateInView>

            {/* Contact Information - Takes 1 column on desktop */}
            <AnimateInView direction="right" className="lg:col-span-1">
              <div className="space-y-6">
                {/* Info Cards */}
                {infoSection.items.map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <AnimateInView key={idx} delay={idx * 0.1}>
                      <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300" />
                        <div className="relative space-y-3 flex gap-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground text-lg">{info.title}</h3>
                            {info.link && info.link !== "#" ? (
                              <a
                                href={info.link}
                                className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 mt-2 group/link"
                              >
                                {info.details}
                                <ArrowRight className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                              </a>
                            ) : (
                              <p className="text-muted-foreground mt-2">{info.details}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </AnimateInView>
                  )
                })}

                {/* Quick Stats */}
                <AnimateInView delay={0.3}>
                  <div className="rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-6 backdrop-blur-sm">
                    <h3 className="font-semibold text-foreground mb-4">Response Time</h3>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Average response</p>
                        <p className="font-semibold text-foreground">2 hours</p>
                      </div>
                    </div>
                  </div>
                </AnimateInView>

                {/* CTA Card */}
                <AnimateInView delay={0.4}>
                  <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-6 backdrop-blur-sm">
                    <h3 className="font-semibold text-foreground mb-2">Prefer to call?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {infoSection.quickNote.description}
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 font-medium"
                    >
                      +88 01516573530
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </AnimateInView>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4">
          <AnimateInView className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Contact Us?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing exceptional service and support
            </p>
          </AnimateInView>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Mail,
                title: "Quick Response",
                description: "We respond to all inquiries within 24 hours",
              },
              {
                icon: Phone,
                title: "Multiple Channels",
                description: "Reach us via email, phone, or contact form",
              },
              {
                icon: MapPin,
                title: "Always Available",
                description: "Available 24/7 for your convenience",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <AnimateInView key={idx} delay={idx * 0.1}>
                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300" />
                    <div className="relative">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </AnimateInView>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions
            </p>
          </AnimateInView>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What's the best way to reach you?",
                a: "You can use the contact form above, email us directly, or call during business hours. We typically respond within 24 hours.",
              },
              {
                q: "Do you offer phone consultations?",
                a: "Yes! We offer free initial consultations. Please mention this in your message or call us directly.",
              },
              {
                q: "What information should I include?",
                a: "Please provide as much detail as possible about your inquiry. This helps us respond more effectively.",
              },
              {
                q: "Are you available on weekends?",
                a: "We monitor messages 24/7, but response times may be longer on weekends.",
              },
            ].map((faq, idx) => (
              <AnimateInView key={idx} delay={idx * 0.05}>
                <details className="group rounded-lg border border-border/50 bg-card/50 p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors duration-300">
                    {faq.q}
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="container relative px-4">
          <AnimateInView className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Send us a message today and let's discuss how we can help you achieve your goals.
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 scroll-smooth"
            >
              Send a Message
              <ArrowRight className="h-5 w-5" />
            </a>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
