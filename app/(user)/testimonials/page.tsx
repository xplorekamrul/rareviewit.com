// app/testimonials/page.tsx
import { testimonials } from "@/data/corpus";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import TestimonialsClient from "./TestimonialsClient";

export const metadata = generateSEOMetadata({
  title: testimonials.meta.title,
  description: testimonials.meta.description,
  path: testimonials.meta.path,
  ogImage: testimonials.meta.ogImage,
  keywords: [...testimonials.meta.keywords], // spread to satisfy SEOProps string[]
});

export default function Page() {
  return (
    <TestimonialsClient
      data={{
        hero: testimonials.hero,
        stats: [...testimonials.stats],
        items: [...testimonials.items],
        videos: testimonials.videos,
        cta: testimonials.cta,
      }}
    />
  );
}
