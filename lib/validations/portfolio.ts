import { z } from "zod";

export const portfolioCategorySchema = z.object({
   name: z.string().min(1, "Category name is required").max(100, "Category name must be less than 100 characters"),
   description: z.string().optional(),
   icon: z.string().optional(),
   color: z.string().optional(),
});

export type PortfolioCategoryInput = z.infer<typeof portfolioCategorySchema>;

export const portfolioSchema = z.object({
   title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
   description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description must be less than 2000 characters"),
   categoryId: z.string().min(1, "Category is required"),
   image: z.string().url("Image must be a valid URL"),
   tags: z.array(z.string()).min(1, "At least one tag is required").max(10, "Maximum 10 tags allowed"),
   featured: z.boolean().default(false),
   status: z.enum(["PUBLISHED", "DRAFT"]).default("PUBLISHED"),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;
