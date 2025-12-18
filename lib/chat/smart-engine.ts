// lib/chat/smart-engine.ts
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
      // Wait for existing load to complete
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

// Search through corpus data to find relevant information
function searchCorpus(query: string, corpus: CorpusData): any[] {
   const lowerQuery = query.toLowerCase()
   const results: any[] = []

   // Search through all pages
   for (const page of corpus.pages) {
      const pageContent = JSON.stringify(page).toLowerCase()

      // Calculate relevance score
      let score = 0
      const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2)

      for (const word of queryWords) {
         const matches = (pageContent.match(new RegExp(word, 'g')) || []).length
         score += matches
      }

      if (score > 0) {
         results.push({ page, score })
      }
   }

   // Sort by relevance
   results.sort((a, b) => b.score - a.score)
   return results.slice(0, 3) // Top 3 results
}

// Extract relevant information from search results
function extractAnswer(query: string, results: any[]): string {
   if (results.length === 0) {
      return "I'm here to help you learn about our services, pricing, team, and more. Could you please rephrase your question or ask about something specific like our services, pricing, or how to contact us?"
   }

   const lowerQuery = query.toLowerCase()
   const topResult = results[0].page

   // Pricing questions
   if (lowerQuery.includes('pric') || lowerQuery.includes('cost') || lowerQuery.includes('package')) {
      if (topResult.pageId === 'pricing' && topResult.packages) {
         let answer = "Here's our pricing information:\n\n"

         for (const pkg of topResult.packages) {
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
      if (topResult.pageId === 'pricing' && topResult.packages) {
         const enterprise = topResult.packages.find((p: any) => p.name === 'Enterprise')
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
      if (topResult.pageId === 'contact' && topResult.infoSection) {
         let answer = "Here's how you can reach us:\n\n"
         for (const item of topResult.infoSection.items) {
            answer += `**${item.title}:** ${item.details}\n`
         }
         answer += `\n${topResult.infoSection.quickNote.description}`
         return answer
      }
   }

   // Services questions
   if (lowerQuery.includes('service') || lowerQuery.includes('what do you do') || lowerQuery.includes('offer')) {
      if (topResult.pageId === 'services' && topResult.services) {
         let answer = "We offer comprehensive digital services:\n\n"
         for (const service of topResult.services) {
            answer += `**${service.title}**\n${service.description}\n\n`
         }
         answer += "Would you like to know more about any specific service?"
         return answer
      }
   }

   // Team questions
   if (lowerQuery.includes('team') || lowerQuery.includes('who') || lowerQuery.includes('about you')) {
      if (topResult.pageId === 'about' && topResult.team) {
         let answer = "Meet our talented team:\n\n"
         for (const member of topResult.team) {
            answer += `**${member.name}** - ${member.role}\n${member.bio}\n\n`
         }
         return answer
      }
   }

   // Portfolio/work questions
   if (lowerQuery.includes('portfolio') || lowerQuery.includes('work') || lowerQuery.includes('project') || lowerQuery.includes('example')) {
      if (topResult.pageId === 'portfolio' && topResult.projects) {
         let answer = "Check out some of our recent work:\n\n"
         for (const project of topResult.projects.slice(0, 3)) {
            answer += `**${project.title}** (${project.category})\n${project.description}\n${project.results}\n\n`
         }
         answer += "Visit our portfolio page to see more detailed case studies!"
         return answer
      }
   }

   // Generic answer from top result
   if (topResult.hero) {
      let answer = `**${topResult.hero.title}**\n\n${topResult.hero.description}\n\n`

      // Add relevant sections
      if (topResult.services && topResult.services.length > 0) {
         answer += "Key offerings:\n"
         for (const service of topResult.services.slice(0, 3)) {
            answer += `• ${service.title}: ${service.description}\n`
         }
      }

      return answer
   }

   return "I found some information about that. Could you be more specific about what you'd like to know?"
}

// Get citations from search results
function getCitations(results: any[]): Array<{ title: string; url: string }> {
   const citations: Array<{ title: string; url: string }> = []

   for (const result of results.slice(0, 3)) {
      const page = result.page
      if (page.meta) {
         citations.push({
            title: page.meta.title || page.pageId,
            url: page.meta.path || `/${page.pageId}`
         })
      }
   }

   return citations
}

export async function* smartStreamChat(query: string): AsyncGenerator<string> {
   // Load corpus data
   await new Promise(resolve => setTimeout(resolve, 300)) // Simulate thinking

   const corpus = await loadCorpus()

   // Search for relevant information
   const results = searchCorpus(query, corpus)

   // Generate answer
   const answer = extractAnswer(query, results)
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

export async function getSmartCitations(query: string): Promise<Array<{ title: string; url: string }>> {
   const corpus = await loadCorpus()
   const results = searchCorpus(query, corpus)
   return getCitations(results)
}

export function isSmartEngineReady(): boolean {
   return true // Always ready
}