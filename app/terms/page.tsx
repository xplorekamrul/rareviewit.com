"use client"

import { Badge } from "@/components/ui/badge"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using this website and our services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our website or services.",
        "We reserve the right to modify these terms at any time. Your continued use of the website following any changes indicates your acceptance of the new terms.",
      ],
    },
    {
      title: "Use of Services",
      content: [
        "You agree to use our services only for lawful purposes and in accordance with these Terms and Conditions. You agree not to use our services in any way that could damage, disable, overburden, or impair our servers or networks.",
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      ],
    },
    {
      title: "Intellectual Property Rights",
      content: [
        "All content on this website, including text, graphics, logos, images, and software, is the property of Creative Agency or its content suppliers and is protected by international copyright laws.",
        "You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of our content without our express written permission.",
        "Any work we create for you as part of our services remains our intellectual property until full payment is received, at which point ownership transfers to you as specified in your service agreement.",
      ],
    },
    {
      title: "Service Agreements",
      content: [
        "Specific terms for our services will be outlined in individual service agreements or statements of work. These agreements will detail project scope, deliverables, timelines, and payment terms.",
        "We reserve the right to refuse service to anyone for any reason at any time.",
        "All prices are subject to change without notice, but changes will not affect orders already confirmed.",
      ],
    },
    {
      title: "Payment Terms",
      content: [
        "Payment terms will be specified in your service agreement. Generally, we require a deposit before beginning work, with the balance due upon completion or according to agreed milestones.",
        "Late payments may be subject to interest charges and may result in suspension of services.",
        "All fees are non-refundable unless otherwise specified in your service agreement.",
      ],
    },
    {
      title: "Client Responsibilities",
      content: [
        "You agree to provide timely feedback, approvals, and any materials or information necessary for us to complete your project.",
        "Delays caused by lack of client input may result in project timeline extensions and potential additional fees.",
        "You represent and warrant that any materials you provide to us do not infringe on any third-party rights.",
      ],
    },
    {
      title: "Warranties and Disclaimers",
      content: [
        "We strive to provide high-quality services, but we make no warranties or representations about the accuracy or completeness of our website content or services.",
        "Our services are provided 'as is' without warranty of any kind, either express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.",
        "We do not guarantee that our services will be uninterrupted, timely, secure, or error-free.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "To the fullest extent permitted by law, Creative Agency shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.",
        "Our total liability for any claims arising from our services shall not exceed the amount you paid us for the specific service giving rise to the claim.",
      ],
    },
    {
      title: "Indemnification",
      content: [
        "You agree to indemnify and hold harmless Creative Agency and its employees, contractors, and affiliates from any claims, damages, losses, liabilities, and expenses arising from your use of our services or violation of these terms.",
      ],
    },
    {
      title: "Termination",
      content: [
        "We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms and Conditions.",
        "Upon termination, your right to use our services will immediately cease. All provisions of these terms that by their nature should survive termination shall survive.",
      ],
    },
    {
      title: "Governing Law",
      content: [
        "These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.",
        "Any disputes arising from these terms shall be resolved in the courts of San Francisco County, California.",
      ],
    },
    {
      title: "Contact Information",
      content: [
        "If you have any questions about these Terms and Conditions, please contact us at:",
        "Email: legal@creative.agency",
        "Phone: +1 (555) 123-4567",
        "Address: 123 Creative Street, San Francisco, CA 94102",
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              Legal
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Terms & Conditions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-balance">Last Updated: January 15, 2025</p>
          </AnimateInView>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <AnimateInView>
              <div className="mb-12 rounded-lg bg-muted/30 p-6 md:p-8">
                <p className="text-lg leading-relaxed text-foreground">
                  Welcome to Creative Agency. These Terms and Conditions outline the rules and regulations for the use
                  of our website and services. By accessing this website and using our services, you accept these terms
                  and conditions in full.
                </p>
              </div>
            </AnimateInView>

            <StaggerContainer className="space-y-12">
              {sections.map((section, index) => (
                <AnimateInView key={index} delay={index * 0.1}>
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">{section.title}</h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </AnimateInView>
              ))}
            </StaggerContainer>

            <AnimateInView delay={0.3}>
              <div className="mt-12 rounded-lg border border-border bg-card p-6 md:p-8">
                <h3 className="mb-4 text-xl font-bold text-foreground">Agreement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By using our website and services, you hereby consent to our Terms and Conditions and agree to abide
                  by them. If you do not agree with any part of these terms, you must not use our website or services.
                </p>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>
    </>
  )
}
