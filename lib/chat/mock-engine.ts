// lib/chat/mock-engine.ts
"use client"

interface MockResponse {
   content: string
   citations?: Array<{ title: string; url: string }>
}

// Simple conversation context to avoid repetition
let lastResponse: string | null = null
let conversationContext: string[] = []

// Mock responses based on common queries
const mockResponses: Record<string, MockResponse> = {
   services: {
      content: "We offer comprehensive digital services including:\n\n• **Web Design & Development** - Custom websites and web applications\n• **Digital Marketing** - SEO, social media, and online advertising\n• **App Development** - Mobile and desktop applications\n• **Branding & Design** - Logo design, brand identity, and marketing materials\n\nWould you like to know more about any specific service?",
      citations: [
         { title: "Services", url: "/services" },
         { title: "Portfolio", url: "/portfolio" }
      ]
   },
   pricing: {
      content: "Our pricing is tailored to your specific needs:\n\n• **Starter Package** - Perfect for small businesses\n• **Professional Package** - Ideal for growing companies\n• **Enterprise Package** - Comprehensive solutions for large organizations\n\nContact us for a personalized quote based on your requirements.",
      citations: [
         { title: "Pricing", url: "/pricing" },
         { title: "Contact", url: "/contact" }
      ]
   },
   enterprise: {
      content: "For larger companies like yours, I'd recommend our **Enterprise Package**:\n\n• **Custom Solutions** - Tailored to your specific business needs\n• **Dedicated Team** - Assigned project managers and specialists\n• **Scalable Architecture** - Built to grow with your business\n• **Priority Support** - 24/7 technical support and maintenance\n• **Advanced Analytics** - Comprehensive reporting and insights\n• **Integration Services** - Connect with your existing systems\n\nThis package includes everything in our Professional package plus enterprise-grade features. Contact us for a detailed proposal and pricing.",
      citations: [
         { title: "Pricing", url: "/pricing" },
         { title: "Contact", url: "/contact" }
      ]
   },
   packages: {
      content: "Here are the details of our three main packages:\n\n**Starter Package** ($2,500 - $5,000)\n• Basic website design (5-10 pages)\n• Mobile responsive\n• Basic SEO setup\n• 3 months support\n\n**Professional Package** ($5,000 - $15,000)\n• Advanced website with custom features\n• E-commerce capabilities\n• Advanced SEO & analytics\n• Social media integration\n• 6 months support\n\n**Enterprise Package** ($15,000+)\n• Fully custom solutions\n• Advanced integrations\n• Dedicated team\n• Ongoing maintenance\n• 12 months premium support\n\nPrices vary based on specific requirements. Would you like a detailed quote?",
      citations: [
         { title: "Pricing", url: "/pricing" },
         { title: "Contact", url: "/contact" }
      ]
   },
   team: {
      content: "Our experienced team includes:\n\n• **Designers** - Creative professionals with years of experience\n• **Developers** - Full-stack engineers specializing in modern technologies\n• **Marketing Specialists** - Digital marketing experts\n• **Project Managers** - Ensuring smooth project delivery\n\nWe're passionate about delivering exceptional results for our clients.",
      citations: [
         { title: "About", url: "/about" },
         { title: "Careers", url: "/careers" }
      ]
   },
   contact: {
      content: "Get in touch with us:\n\n• **Email** - hello@company.com\n• **Phone** - (555) 123-4567\n• **Office Hours** - Monday-Friday, 9 AM - 6 PM\n\nWe typically respond within 24 hours. For urgent matters, please call us directly.",
      citations: [
         { title: "Contact", url: "/contact" }
      ]
   },
   portfolio: {
      content: "Check out our recent work:\n\n• **E-commerce Solutions** - Modern online stores with seamless checkout\n• **Corporate Websites** - Professional business websites\n• **Mobile Apps** - iOS and Android applications\n• **Branding Projects** - Complete brand identity packages\n\nView our full portfolio to see detailed case studies.",
      citations: [
         { title: "Portfolio", url: "/portfolio" },
         { title: "Testimonials", url: "/testimonials" }
      ]
   }
}

const defaultResponse: MockResponse = {
   content: "I'm here to help you learn about our services, team, pricing, and more. You can ask me about:\n\n• Our services and capabilities\n• Pricing and packages\n• Our team and expertise\n• How to get in touch\n• Our portfolio and past work\n\nWhat would you like to know?",
   citations: [
      { title: "About", url: "/about" },
      { title: "Services", url: "/services" }
   ]
}

function findBestMatch(query: string): MockResponse {
   const lowerQuery = query.toLowerCase().trim()

   // Add to conversation context
   conversationContext.push(lowerQuery)
   if (conversationContext.length > 5) {
      conversationContext = conversationContext.slice(-5) // Keep last 5 messages
   }

   // Handle specific enterprise/large company questions
   if (lowerQuery.includes('big') || lowerQuery.includes('large') || lowerQuery.includes('enterprise') ||
      lowerQuery.includes('bigger') || lowerQuery.includes('corporation') || lowerQuery.includes('company is big')) {
      lastResponse = 'enterprise'
      return mockResponses.enterprise
   }

   // Handle package details questions - check if we just talked about pricing
   if (lowerQuery.includes('package') || lowerQuery.includes('detail') || lowerQuery.includes('breakdown') ||
      lowerQuery.includes('what include') || lowerQuery.includes('features') || lowerQuery.includes('compare') ||
      (lastResponse === 'pricing' && (lowerQuery.includes('tell me') || lowerQuery.includes('about')))) {
      lastResponse = 'packages'
      return mockResponses.packages
   }

   // Enhanced pricing keywords
   if (lowerQuery.includes('pric') || lowerQuery.includes('cost') || lowerQuery.includes('how much') ||
      lowerQuery.includes('rate') || lowerQuery.includes('fee') || lowerQuery.includes('budget') ||
      lowerQuery.includes('quote') || lowerQuery.includes('estimate')) {
      lastResponse = 'pricing'
      return mockResponses.pricing
   }

   // Contact keywords (prioritize over team keywords)
   if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email') ||
      lowerQuery.includes('phone') || lowerQuery.includes('call') || lowerQuery.includes('get in touch') ||
      lowerQuery.includes('talk to') || lowerQuery.includes('speak with') || lowerQuery.includes('number') ||
      lowerQuery.includes('how can') || lowerQuery.includes('how to contact')) {
      lastResponse = 'contact'
      return mockResponses.contact
   }

   // Services keywords
   if (lowerQuery.includes('service') || lowerQuery.includes('what do you do') ||
      lowerQuery.includes('capabilities') || lowerQuery.includes('offer') ||
      lowerQuery.includes('provide') || lowerQuery.includes('specialize')) {
      lastResponse = 'services'
      return mockResponses.services
   }

   // Team keywords (after contact to avoid conflicts)
   if (lowerQuery.includes('team') || lowerQuery.includes('who') || lowerQuery.includes('staff') ||
      lowerQuery.includes('people') || lowerQuery.includes('employee') || lowerQuery.includes('about you')) {
      lastResponse = 'team'
      return mockResponses.team
   }

   // Portfolio keywords
   if (lowerQuery.includes('portfolio') || lowerQuery.includes('work') || lowerQuery.includes('project') ||
      lowerQuery.includes('example') || lowerQuery.includes('case study') || lowerQuery.includes('previous') ||
      lowerQuery.includes('past work') || lowerQuery.includes('showcase')) {
      lastResponse = 'portfolio'
      return mockResponses.portfolio
   }

   // Context-aware responses for follow-up questions
   if (lastResponse === 'pricing' && (lowerQuery.includes('which') || lowerQuery.includes('best') ||
      lowerQuery.includes('recommend') || lowerQuery.includes('should i'))) {
      lastResponse = 'packages'
      return mockResponses.packages
   }

   // If no specific match, return default
   lastResponse = 'default'
   return defaultResponse
}

export async function* mockStreamChat(query: string): AsyncGenerator<string> {
   // Simulate thinking time
   await new Promise(resolve => setTimeout(resolve, 300))

   const response = findBestMatch(query)
   const words = response.content.split(' ')

   // Stream words with realistic typing speed
   for (let i = 0; i < words.length; i++) {
      const chunk = i === 0 ? words[i] : ' ' + words[i]
      yield chunk

      // Vary the delay to simulate natural typing
      const delay = Math.random() * 50 + 20 // 20-70ms per word
      await new Promise(resolve => setTimeout(resolve, delay))
   }
}

export function getMockCitations(query: string): Array<{ title: string; url: string }> {
   const response = findBestMatch(query)
   return response.citations || []
}

export function isMockEngineReady(): boolean {
   return true // Always ready
}