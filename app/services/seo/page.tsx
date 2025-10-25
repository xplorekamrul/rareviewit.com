// app/seo/page.tsx
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { seo } from "@/data/corpus";
import SEOClient from "./SEOClient";

export const metadata = generateSEOMetadata({
  title: seo.meta.title,
  description: seo.meta.description,
  keywords: [...seo.meta.keywords], 
  ogImage: seo.meta.ogImage,
  path: seo.meta.path,
});

export default function Page() {
  return <SEOClient />;
}
