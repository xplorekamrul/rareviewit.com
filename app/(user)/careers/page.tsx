// app/careers/page.tsx
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import { careers } from "@/data/corpus"
import CareersClient from "./CareersClient"

export const metadata = generateSEOMetadata({
  title: careers.meta.title,
  description: careers.meta.description,
  path: careers.meta.path,
  ogImage: careers.meta.ogImage,
})

export default function Page() {
  return <CareersClient />
}
