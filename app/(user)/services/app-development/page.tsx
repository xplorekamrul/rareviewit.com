// app/app-development/page.tsx
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { appDev } from "@/data/corpus";
import AppDevelopmentClient from "./AppDevelopmentClient";

export const metadata = generateSEOMetadata({
  title: appDev.meta.title,
  description: appDev.meta.description,
  keywords: [...appDev.meta.keywords],
  ogImage: appDev.meta.ogImage,
  path: appDev.meta.path,
});

export default function Page() {
  return <AppDevelopmentClient />;
}
