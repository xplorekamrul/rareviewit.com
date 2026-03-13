"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { portfolioCategorySchema, portfolioSchema } from "@/lib/validations/portfolio";
import { cacheLife, cacheTag, updateTag } from "next/cache";

// ===== Portfolio Category Actions =====

export async function createPortfolioCategory(data: unknown) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      const validatedData = portfolioCategorySchema.parse(data);

      // Get the highest order value
      const lastCategory = await (prisma as any).portfolioCategory.findFirst({
         orderBy: { order: 'desc' },
         select: { order: true },
      })

      const nextOrder = (lastCategory?.order ?? -1) + 1

      const category = await (prisma as any).portfolioCategory.create({
         data: {
            ...validatedData,
            order: nextOrder,
         },
      });

      updateTag("portfolio-categories");

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

      updateTag("portfolio-categories");

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

      updateTag("portfolio-categories");

      return {
         success: true,
         message: "Category deleted successfully",
      };
   } catch (error) {
      console.error("Delete portfolio category error:", error);
      throw error;
   }
}

export async function reorderPortfolioCategories(categories: Array<{ id: string; order: number }>) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      // Update all categories with their new order
      await Promise.all(
         categories.map(({ id, order }) =>
            (prisma as any).portfolioCategory.update({
               where: { id },
               data: { order },
            })
         )
      )

      updateTag("portfolio-categories");

      return {
         success: true,
         message: "Categories reordered successfully",
      };
   } catch (error) {
      console.error("Error reordering categories:", error);
      return {
         success: false,
         error: "Failed to reorder categories",
      };
   }
}

export async function getPortfolioCategories() {
   "use cache";
   cacheLife("hours");
   cacheTag("portfolio-categories");

   try {
      const categories = await (prisma as any).portfolioCategory.findMany({
         orderBy: { order: "asc" },
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

      // Get the highest order value
      const lastPortfolio = await prisma.portfolio.findFirst({
         orderBy: { order: 'desc' },
         select: { order: true },
      })

      const nextOrder = (lastPortfolio?.order ?? -1) + 1

      const portfolioData = {
         ...validatedData,
         url: validatedData.url === "" ? null : validatedData.url,
         order: nextOrder,
      };

      const portfolio = await prisma.portfolio.create({
         data: portfolioData,
         include: { category: true },
      });

      updateTag("portfolios");

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

      const portfolioData = {
         ...validatedData,
         url: validatedData.url === "" ? null : validatedData.url,
      };

      const portfolio = await prisma.portfolio.update({
         where: { id },
         data: portfolioData,
         include: { category: true },
      });

      updateTag("portfolios");

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

      updateTag("portfolios");

      return {
         success: true,
         message: "Portfolio deleted successfully",
      };
   } catch (error) {
      console.error("Delete portfolio error:", error);
      throw error;
   }
}

export async function reorderPortfolios(portfolios: Array<{ id: string; order: number }>) {
   try {
      const session = await auth();
      if (!session?.user || !["ADMIN", "SUPER_ADMIN", "DEVELOPER"].includes(session.user.role)) {
         throw new Error("Unauthorized");
      }

      // Update all portfolios with their new order
      await Promise.all(
         portfolios.map(({ id, order }) =>
            prisma.portfolio.update({
               where: { id },
               data: { order },
            })
         )
      )

      updateTag("portfolios");

      return {
         success: true,
         message: "Portfolios reordered successfully",
      };
   } catch (error) {
      console.error("Error reordering portfolios:", error);
      return {
         success: false,
         error: "Failed to reorder portfolios",
      };
   }
}

export async function getPortfolios() {
   "use cache";
   cacheLife("hours");
   cacheTag("portfolios");

   try {
      const portfolios = await prisma.portfolio.findMany({
         include: { category: true },
         orderBy: { order: "asc" },
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
   cacheLife("hours");
   cacheTag("portfolios");

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
   cacheLife("hours");
   cacheTag("portfolios");

   try {
      const portfolios = await prisma.portfolio.findMany({
         where: { status: "PUBLISHED" },
         include: { category: true },
         orderBy: [{ order: "asc" }, { featured: "desc" }],
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

export async function getFeaturedProjects() {
   "use cache";
   cacheLife("hours");
   cacheTag("portfolios");

   try {
      const projects = await prisma.portfolio.findMany({
         where: {
            status: "PUBLISHED",
         },
         orderBy: [
            { order: "asc" },
            { featured: "desc" },
         ],
         take: 6,
         include: {
            category: {
               select: { name: true },
            },
         },
      });

      const mappedProjects = projects.map((project) => ({
         title: project.title,
         category: project.category.name,
         image: project.image,
         url: project.url,
         tags: project.tags,
      }));

      return {
         success: true,
         data: mappedProjects,
      };
   } catch (error) {
      console.error("Get featured projects error:", error);
      return {
         success: false,
         data: [],
      };
   }
}
