// app/(user)/portfolio/page.tsx
import { portfolio } from "@/data/corpus";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { Suspense } from "react";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: portfolio.meta.title,
  description: portfolio.meta.description,
}

async function getPortfolioData() {
  "use cache";
  try {
    const categories = await prisma.portfolioCategory.findMany({
      include: {
        portfolios: {
          where: { status: "PUBLISHED" },
          orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
          select: {
            id: true,
            title: true,
            description: true,
            image: true,
            tags: true,
            featured: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return categories as any;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return [];
  }
}

async function PortfolioContent() {
  const categories = await getPortfolioData();

  return (
    <PortfolioClient
      data={{
        hero: portfolio.hero,
        categories: categories,
        cta: portfolio.cta,
      }}
    />
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  )
}
