import { z } from "zod";

export const serviceSchema = z.object({
   id: z.string().optional(),
   title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be less than 255 characters"),
   description: z
      .string()
      .min(1, "Description is required")
      .max(2000, "Description must be less than 2000 characters"),
   icon: z
      .string()
      .min(1, "Icon is required")
      .max(50, "Icon name must be less than 50 characters"),
   href: z
      .string()
      .min(1, "Link is required")
      .max(255, "Link must be less than 255 characters"),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
