"use server";

import { prisma } from "@/lib/prisma";
import { adminActionClient } from "@/lib/safe-action/clients";
import { teamMemberSchema } from "@/lib/validations/team";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { z } from "zod";

// Create Team Member
export const createTeamMember = adminActionClient
   .schema(teamMemberSchema)
   .action(async ({ parsedInput: data }) => {
      try {
         // Get the highest order value
         const lastTeamMember = await (prisma as any).teamMember.findFirst({
            orderBy: { order: 'desc' },
            select: { order: true },
         })

         const nextOrder = (lastTeamMember?.order ?? -1) + 1

         const teamMemberData = {
            ...data,
            imageAlt: data.imageAlt || null,
            order: nextOrder,
         };

         const teamMember = await (prisma as any).teamMember.create({
            data: teamMemberData,
         });

         updateTag("team-members");

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
   .schema(teamMemberSchema.extend({ id: z.string(), order: z.number().int().min(0).default(0) }))
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

         updateTag("team-members");

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

         updateTag("team-members");

         return {
            success: true,
            message: "Team member deleted successfully",
         };
      } catch (error) {
         console.error("Delete team member error:", error);
         throw new Error("Failed to delete team member");
      }
   });

// Reorder Team Members
export const reorderTeamMembers = adminActionClient
   .schema(z.object({
      teamMembers: z.array(z.object({
         id: z.string(),
         order: z.number().int(),
      })),
   }))
   .action(async ({ parsedInput: { teamMembers } }) => {
      try {
         // Update all team members with their new order
         await Promise.all(
            teamMembers.map(({ id, order }) =>
               (prisma as any).teamMember.update({
                  where: { id },
                  data: { order },
               })
            )
         )

         updateTag("team-members");

         return {
            success: true,
            message: "Team members reordered successfully",
         };
      } catch (error) {
         console.error("Error reordering team members:", error);
         return {
            success: false,
            error: "Failed to reorder team members",
         };
      }
   });

// Get Team Members (Cached)
export async function getTeamMembers() {
   "use cache";
   cacheLife("hours");
   cacheTag("team-members");

   try {
      const teamMembers = await (prisma as any).teamMember.findMany({
         orderBy: { order: "asc" },
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
