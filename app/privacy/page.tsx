"use client"

import { Badge } from "@/components/ui/badge"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, company name, and any other information you choose to provide.",
        "We automatically collect certain information about your device when you use our website, including your IP address, browser type, operating system, referring URLs, and pages visited.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you technical notices and support messages, and respond to your comments and questions.",
        "We may use your information to send you marketing communications about our services, events, and promotions. You can opt out of these communications at any time.",
        "We use analytics tools to understand how users interact with our website and services, which helps us improve the user experience.",
      ],
    },
    {
      title: "Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who perform services on our behalf, such as hosting, analytics, and customer support.",
        "We may disclose your information if required by law or if we believe such action is necessary to comply with legal obligations, protect our rights, or ensure the safety of our users.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to collect information about your browsing activities and to personalize your experience on our website.",
        "You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of our website.",
      ],
    },
    {
      title: "Your Rights and Choices",
      content: [
        "You have the right to access, update, or delete your personal information. You can do this by logging into your account or contacting us directly.",
        "You have the right to opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us.",
        "If you are located in the European Economic Area, you have additional rights under GDPR, including the right to data portability and the right to lodge a complaint with a supervisory authority.",
      ],
    },
    {
      title: "Children's Privacy",
      content: [
        "Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information.",
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
        "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.",
      ],
    },
    {
      title: "Contact Us",
      content: [
        "If you have any questions about this Privacy Policy or our privacy practices, please contact us at:",
        "Email: privacy@creative.agency",
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
              Privacy Policy
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
                  At Creative Agency, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our website or use our services. Please read
                  this privacy policy carefully.
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
                <h3 className="mb-4 text-xl font-bold text-foreground">Your Consent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By using our website and services, you consent to our Privacy Policy and agree to its terms. If you do
                  not agree with this policy, please do not use our website or services.
                </p>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>
    </>
  )
}
