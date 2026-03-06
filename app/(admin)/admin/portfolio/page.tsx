import { getPortfolioCategories, getPortfolios } from "@/actions/portfolio";
import { PortfolioPageClient } from "@/components/admin/protfolio/PortfolioPageClient";

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
   createdAt: Date;
   updatedAt: Date;
}

interface Category {
   id: string;
   name: string;
   description?: string;
   icon?: string;
   color?: string;
   createdAt: Date;
}

export default async function AdminPortfolioPage() {
   // Fetch data on server side
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

   return (
      <PortfolioPageClient
         initialPortfolios={portfolios}
         initialCategories={categories}
      />
   );
}
