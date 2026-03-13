import { getPortfolioCategories, getPortfolios } from "@/actions/portfolio";
import { PortfolioPageClient } from "@/components/admin/protfolio/PortfolioPageClient";
import { cacheLife, cacheTag } from "next/cache";

interface Portfolio {
   id: string;
   title: string;
   description: string | null;
   categoryId: string;
   category: { id: string; name: string } | string;
   image: string;
   url: string | null;
   tags: string[];
   featured: boolean;
   status: string;
   order: number;
   createdAt: Date;
   updatedAt: Date;
}

interface Category {
   id: string;
   name: string;
   description?: string;
   icon?: string;
   color?: string;
   order: number;
   createdAt: Date;
}

async function getPortfolioData() {
   "use cache";
   cacheLife("hours");
   cacheTag("portfolios", "portfolio-categories");

   const [portfolioResult, categoryResult] = await Promise.all([
      getPortfolios(),
      getPortfolioCategories(),
   ]);

   const portfolios: Portfolio[] = (portfolioResult.success && portfolioResult.data
      ? (portfolioResult.data as unknown as Portfolio[])
      : []) || [];

   const categories: Category[] = (categoryResult.success && categoryResult.data
      ? categoryResult.data
      : []) || [];

   return { portfolios, categories };
}

export default async function AdminPortfolioPage() {
   const { portfolios, categories } = await getPortfolioData();

   return (
      <PortfolioPageClient
         initialPortfolios={portfolios}
         initialCategories={categories}
      />
   );
}
