// lib/chat/smart-engine-v2.ts
"use client"

interface CorpusData {
   version: number
   site: {
      brand: string
      baseUrl: string
   }
   pages: any[]
}

let corpusData: CorpusData | null = null
let isLoading = false

// Load corpus data
async function loadCorpus(): Promise<CorpusData> {
   if (corpusData) return corpusData

   if (isLoading) {
      while (isLoading) {
         await new Promise(resolve => setTimeout(resolve, 100))
      }
      return corpusData!
   }

   isLoading = true
   try {
      const response = await fetch('/chatbot/corpus.json')
      corpusData = await response.json()
      return corpusData!
   } finally {
      isLoading = false
   }
}

// Find specific page by ID
function findPage(corpus: CorpusData, pageId: string): any {
   return corpus.pages.find(page => page.pageId === pageId)
}

// Generate intelligent response based on query
function generateResponse(query: string, corpus: CorpusData): string {
   const lowerQuery = query.toLowerCase()

   // Pricing questions
   if (lowerQuery.includes('pric') || lowerQuery.includes('cost') || lowerQuery.includes('package')) {
      const pricingPage = findPage(corpus, 'pricing')
      if (pricingPage && pricingPage.packages) {
         let answer = "Here's our pricing information:\n\n"

         for (const pkg of pricingPage.packages) {
            answer += `**${pkg.name} Package** - $${pkg.priceOneTime} (one-time) or $${pkg.priceMonthly}/month\n`
            answer += `${pkg.description}\n\n`

            // Show key features
            const keyFeatures = pkg.features.slice(0, 3)
            answer += "Key features:\n"
            for (const feature of keyFeatures) {
               answer += `• ${feature}\n`
            }
            answer += "\n"
         }

         answer += "Would you like more details about a specific package?"
         return answer
      }
   }

   // Enterprise/large company questions
   if (lowerQuery.includes('big') || lowerQuery.includes('large') || lowerQuery.includes('enterprise')) {
      const pricingPage = findPage(corpus, 'pricing')
      if (pricingPage && pricingPage.packages) {
         const enterprise = pricingPage.packages.find((p: any) => p.name === 'Enterprise')
         if (enterprise) {
            let answer = `For larger companies, I recommend our **${enterprise.name} Package**:\n\n`
            answer += `**Price:** $${enterprise.priceOneTime} (one-time) or $${enterprise.priceMonthly}/month\n\n`
            answer += `${enterprise.description}\n\n`
            answer += "**Features:**\n"
            for (const feature of enterprise.features) {
               answer += `• ${feature}\n`
            }
            answer += "\nThis package is perfect for established businesses with complex needs. Contact us for a custom quote!"
            return answer
         }
      }
   }

   // Contact questions
   if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('number')) {
      const contactPage = findPage(corpus, 'contact')
      if (contactPage && contactPage.infoSection) {
         let answer = "Here's how you can reach us:\n\n"
         for (const item of contactPage.infoSection.items) {
            answer += `**${item.title}:** ${item.details}\n`
         }
         if (contactPage.infoSection.quickNote) {
            answer += `\n${contactPage.infoSection.quickNote.description}`
         }
         return answer
      }
   }

   // Services questions
   if (lowerQuery.includes('service') || lowerQuery.includes('what do you do') || lowerQuery.includes('offer')) {
      const servicesPage = findPage(corpus, 'services')
      if (servicesPage && servicesPage.services) {
         let answer = "We offer comprehensive digital services:\n\n"
         for (const service of servicesPage.services) {
            answer += `**${service.title}**\n${service.description}\n\n`
         }
         answer += "Would you like to know more about any specific service?"
         return answer
      }
   }

   // Team questions
   if (lowerQuery.includes('team') || lowerQuery.includes('who') || lowerQuery.includes('about you')) {
      const aboutPage = findPage(corpus, 'about')
      if (aboutPage && aboutPage.team) {
         let answer = "Meet our talented team:\n\n"
         for (const member of aboutPage.team) {
            answer += `**${member.name}** - ${member.role}\n${member.bio}\n\n`
         }
         return answer
      }
   }

   // Portfolio/work questions
   if (lowerQuery.includes('portfolio') || lowerQuery.includes('work') || lowerQuery.includes('project') || lowerQuery.includes('example')) {
      const portfolioPage = findPage(corpus, 'portfolio')
      if (portfolioPage && portfolioPage.projects) {
         let answer = "Check out some of our recent work:\n\n"
         for (const project of portfolioPage.projects.slice(0, 3)) {
            answer += `**${project.title}** (${project.category})\n${project.description}\n${project.results}\n\n`
         }
         answer += "Visit our portfolio page to see more detailed case studies!"
         return answer
      }
   }

   // FAQ questions
   if (lowerQuery.includes('faq') || lowerQuery.includes('question') || lowerQuery.includes('help')) {
      const faqPage = findPage(corpus, 'faq')
      if (faqPage && faqPage.faqsByCategory) {
         let answer = "Here are some frequently asked questions:\n\n"

         // Get first few FAQs from General category
         const generalFaqs = faqPage.faqsByCategory.General || []
         for (const faq of generalFaqs.slice(0, 3)) {
            answer += `**Q: ${faq.question}**\n${faq.answer}\n\n`
         }

         answer += "Visit our FAQ page for more detailed answers!"
         return answer
      }
   }

   // Default response
   return "I'm here to help you learn about our services, pricing, team, and more. You can ask me about:\n\n• Our services and capabilities\n• Pricing and packages\n• Our team and expertise\n• How to get in touch\n• Our portfolio and past work\n• Frequently asked questions\n\nWhat would you like to know?"
}

// Get citations based on query
function getCitations(query: string, corpus: CorpusData): Array<{ title: string; url: string }> {
   const lowerQuery = query.toLowerCase()
   const citations: Array<{ title: string; url: string }> = []

   if (lowerQuery.includes('pric') || lowerQuery.includes('cost') || lowerQuery.includes('package')) {
      citations.push({ title: "Pricing", url: "/pricing" })
      citations.push({ title: "Contact", url: "/contact" })
   } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone')) {
      citations.push({ title: "Contact", url: "/contact" })
   } else if (lowerQuery.includes('service') || lowerQuery.includes('offer')) {
      citations.push({ title: "Services", url: "/services" })
      citations.push({ title: "Portfolio", url: "/portfolio" })
   } else if (lowerQuery.includes('team') || lowerQuery.includes('about')) {
      citations.push({ title: "About", url: "/about" })
   } else if (lowerQuery.includes('portfolio') || lowerQuery.includes('work')) {
      citations.push({ title: "Portfolio", url: "/portfolio" })
   } else if (lowerQuery.includes('faq') || lowerQuery.includes('help')) {
      citations.push({ title: "FAQ", url: "/faq" })
   } else {
      citations.push({ title: "About", url: "/about" })
      citations.push({ title: "Services", url: "/services" })
   }

   return citations
}

export async function* smartStreamChatV2(query: string): AsyncGenerator<string> {
   // Simulate thinking time
   await new Promise(resolve => setTimeout(resolve, 300))

   const corpus = await loadCorpus()
   const answer = generateResponse(query, corpus)
   const words = answer.split(' ')

   // Stream words with realistic typing speed
   for (let i = 0; i < words.length; i++) {
      const chunk = i === 0 ? words[i] : ' ' + words[i]
      yield chunk

      // Vary the delay to simulate natural typing
      const delay = Math.random() * 50 + 20 // 20-70ms per word
      await new Promise(resolve => setTimeout(resolve, delay))
   }
}

export async function getSmartCitationsV2(query: string): Promise<Array<{ title: string; url: string }>> {
   const corpus = await loadCorpus()
   return getCitations(query, corpus)
}

export function isSmartEngineV2Ready(): boolean {
   return true // Always ready
}