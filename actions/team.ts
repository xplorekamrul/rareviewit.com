"use server";

import { prisma } from "@/lib/prisma";
import { adminActionClient } from "@/lib/safe-action/clients";
import { teamMemberSchema } from "@/lib/validations/team";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { z } from "zod";

// Create Team Member
export const createTeamMember = adminActionClient
   .schema(teamMemberSchema)
   .action(async ({ parsedInput: data }) => {
      try {
         const teamMemberData = {
            ...data,
            imageAlt: data.imageAlt || null,
         };

         const teamMember = await (prisma as any).teamMember.create({
            data: teamMemberData,
         });

         // @ts-expect-error - Next.js 16 revalidateTag signature
         revalidateTag("team-members");

         return {
            success: true,
            data: teamMember,
            message: "Team member created successfully",
         };
      } catch (error) {
         console.error("Create team member error:", error);
         throw new Error("Failed to create team member");
      }
   });

// Update Team Member
export const updateTeamMember = adminActionClient
   .schema(teamMemberSchema.extend({ id: z.string() }))
   .action(async ({ parsedInput: { id, ...data } }) => {
      try {
         const teamMemberData = {
            ...data,
            imageAlt: data.imageAlt || null,
         };

         const teamMember = await (prisma as any).teamMember.update({
            where: { id },
            data: teamMemberData,
         });

         // @ts-expect-error - Next.js 16 revalidateTag signature
         revalidateTag("team-members");

         return {
            success: true,
            data: teamMember,
            message: "Team member updated successfully",
         };
      } catch (error) {
         console.error("Update team member error:", error);
         throw new Error("Failed to update team member");
      }
   });

// Delete Team Member
export const deleteTeamMember = adminActionClient
   .schema(z.object({ id: z.string() }))
   .action(async ({ parsedInput: { id } }) => {
      try {
         await (prisma as any).teamMember.delete({
            where: { id },
         });

         // @ts-expect-error - Next.js 16 revalidateTag signature
         revalidateTag("team-members");

         return {
            success: true,
            message: "Team member deleted successfully",
         };
      } catch (error) {
         console.error("Delete team member error:", error);
         throw new Error("Failed to delete team member");
      }
   });

// Get Team Members (Cached)
export async function getTeamMembers() {
   "use cache";
   cacheLife("hours");
   cacheTag("team-members");

   try {
      const teamMembers = await (prisma as any).teamMember.findMany({
         orderBy: { createdAt: "desc" },
      });

      return {
         success: true,
         data: teamMembers,
      };
   } catch (error) {
      console.error("Get team members error:", error);
      return {
         success: false,
         data: [],
      };
   }
}
