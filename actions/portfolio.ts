"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { portfolioCategorySchema, portfolioSchema } from "@/lib/validations/portfolio";
import { revalidateTag } from "next/cache";

// ===== Portfolio Category Actions =====

export async function createPortfolioCategory(data: unknown) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      const validatedData = portfolioCategorySchema.parse(data);

      const category = await (prisma as any).portfolioCategory.create({
         data: validatedData,
      });

      // @ts-expect-error - Next.js 16 revalidateTag signature
      revalidateTag("portfolio-categories");

      return {
         success: true,
         data: category,
         message: "Category created successfully",
      };
   } catch (error) {
      console.error("Create portfolio category error:", error);
      throw error;
   }
}

export async function updatePortfolioCategory(id: string, data: unknown) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      const validatedData = portfolioCategorySchema.parse(data);

      const category = await (prisma as any).portfolioCategory.update({
         where: { id },
         data: validatedData,
      });

      // @ts-expect-error - Next.js 16 revalidateTag signature
      revalidateTag("portfolio-categories");

      return {
         success: true,
         data: category,
         message: "Category updated successfully",
      };
   } catch (error) {
      console.error("Update portfolio category error:", error);
      throw error;
   }
}

export async function deletePortfolioCategory(id: string) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      await (prisma as any).portfolioCategory.delete({
         where: { id },
      });

      // @ts-expect-error - Next.js 16 revalidateTag signature
      revalidateTag("portfolio-categories");

      return {
         success: true,
         message: "Category deleted successfully",
      };
   } catch (error) {
      console.error("Delete portfolio category error:", error);
      throw error;
   }
}

export async function getPortfolioCategories() {
   "use cache";
   try {
      const categories = await (prisma as any).portfolioCategory.findMany({
         orderBy: { createdAt: "desc" },
      });

      return {
         success: true,
         data: categories,
      };
   } catch (error) {
      console.error("Get portfolio categories error:", error);
      throw error;
   }
}

// ===== Portfolio Actions =====

export async function createPortfolio(data: unknown) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      const validatedData = portfolioSchema.parse(data);

      const portfolio = await prisma.portfolio.create({
         data: validatedData,
         include: { category: true },
      });

      // @ts-expect-error - Next.js 16 revalidateTag signature
      revalidateTag("portfolios");

      return {
         success: true,
         data: portfolio,
         message: "Portfolio created successfully",
      };
   } catch (error) {
      console.error("Create portfolio error:", error);
      throw error;
   }
}

export async function updatePortfolio(id: string, data: unknown) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      const validatedData = portfolioSchema.parse(data);

      const portfolio = await prisma.portfolio.update({
         where: { id },
         data: validatedData,
         include: { category: true },
      });

      // @ts-expect-error - Next.js 16 revalidateTag signature
      revalidateTag("portfolios");

      return {
         success: true,
         data: portfolio,
         message: "Portfolio updated successfully",
      };
   } catch (error) {
      console.error("Update portfolio error:", error);
      throw error;
   }
}

export async function deletePortfolio(id: string) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      await prisma.portfolio.delete({
         where: { id },
      });

      // @ts-expect-error - Next.js 16 revalidateTag signature
      revalidateTag("portfolios");

      return {
         success: true,
         message: "Portfolio deleted successfully",
      };
   } catch (error) {
      console.error("Delete portfolio error:", error);
      throw error;
   }
}

export async function getPortfolios() {
   "use cache";
   try {
      const portfolios = await prisma.portfolio.findMany({
         include: { category: true },
         orderBy: { createdAt: "desc" },
      });

      return {
         success: true,
         data: portfolios,
      };
   } catch (error) {
      console.error("Get portfolios error:", error);
      throw error;
   }
}

export async function getPortfolioById(id: string) {
   "use cache";
   try {
      const portfolio = await prisma.portfolio.findUnique({
         where: { id },
         include: { category: true },
      });

      if (!portfolio) {
         throw new Error("Portfolio not found");
      }

      return {
         success: true,
         data: portfolio,
      };
   } catch (error) {
      console.error("Get portfolio error:", error);
      throw error;
   }
}

export async function getPublishedPortfolios() {
   "use cache";
   try {
      const portfolios = await prisma.portfolio.findMany({
         where: { status: "PUBLISHED" },
         include: { category: true },
         orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      });

      return {
         success: true,
         data: portfolios,
      };
   } catch (error) {
      console.error("Get published portfolios error:", error);
      throw error;
   }
}
