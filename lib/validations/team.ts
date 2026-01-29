import { z } from "zod";

export const teamMemberSchema = z.object({
   name: z.string().min(1, "Name is required").max(255, "Name must be less than 255 characters"),
   role: z.string().min(1, "Role is required").max(255, "Role must be less than 255 characters"),
   bio: z.string().min(10, "Bio must be at least 10 characters").max(2000, "Bio must be less than 2000 characters"),
   image: z.string().url("Image must be a valid URL"),
   imageAlt: z.string().max(255, "Alt text must be less than 255 characters").optional().or(z.literal("")),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
