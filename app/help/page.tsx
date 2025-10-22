import { generateMetadata } from "@/lib/seo"
import ClientHelpPage from "./ClientHelpPage"

export const metadata = generateMetadata({
  title: "Help Center",
  description: "Find answers to your questions, browse our knowledge base, and get support for all our services.",
  keywords: ["help center", "support", "FAQ", "customer service", "documentation"],
})

export default function HelpPage() {
  return <ClientHelpPage />
}
