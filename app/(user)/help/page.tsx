// app/help/page.tsx
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import { help } from "@/data/corpus"
import ClientHelpPage from "./ClientHelpPage"

export const metadata = generateSEOMetadata({
  title: help.meta.title,
  description: help.meta.description,
  path: help.meta.path,
  ogImage: help.meta.ogImage,
  keywords: help.meta.keywords ? [...help.meta.keywords] as string[] : [],
})

export default function HelpPage() {
  return (
    <ClientHelpPage
      data={{
        hero: help.hero,
        categoriesSection: help.categoriesSection,
        categories: [...help.categories], // plain data (icon as string)
        popularSection: help.popularSection,
        popularArticles: [...help.popularArticles],
        contactSection: {
          ...help.contactSection,
          options: [...help.contactSection.options], // plain data (icon as string)
        },
        quickLinksSection: { ...help.quickLinksSection },
      }}
    />
  )
}
