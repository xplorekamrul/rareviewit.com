// app/digital-marketing/page.tsx
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { marketing } from "@/data/corpus";
import DigitalMarketingClient from "./DigitalMarketingClient";

export const metadata = generateSEOMetadata({
  title: marketing.meta.title,
  description: marketing.meta.description,
  keywords: [...marketing.meta.keywords],
  ogImage: marketing.meta.ogImage,
  path: marketing.meta.path,
});

export default function Page() {
  return <DigitalMarketingClient />;
}
