import { z } from "zod";

export const testimonialSchema = z.object({
   id: z.string().optional(),
   quote: z
      .string()
      .min(10, "Quote must be at least 10 characters")
      .max(1000, "Quote must be less than 1000 characters"),
   author: z
      .string()
      .min(1, "Author name is required")
      .max(255, "Author name must be less than 255 characters"),
   company: z
      .string()
      .min(1, "Company name is required")
      .max(255, "Company name must be less than 255 characters"),
   logo: z
      .string()
      .url("Logo must be a valid URL")
      .optional()
      .or(z.literal("")),
   featured: z.boolean().optional().default(false),
   status: z.enum(["PUBLISHED", "DRAFT"]).optional().default("PUBLISHED"),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
