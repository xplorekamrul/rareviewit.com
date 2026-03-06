"use client";

import { deleteTeamMember } from "@/actions/team";
import { TeamForm } from "@/components/admin/team/TeamForm";
import { TeamTable } from "@/components/admin/team/TeamTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface TeamMember {
   id: string;
   name: string;
   role: string;
   bio: string;
   image: string;
   imageAlt: string | null;
   createdAt: Date;
   updatedAt: Date;
}

interface TeamPageClientProps {
   initialTeamMembers: TeamMember[];
}

export function TeamPageClient({ initialTeamMembers }: TeamPageClientProps) {
   const router = useRouter();
   const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
   const [view, setView] = useState<"table" | "form">("table");
   const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
   const [deletingId, setDeletingId] = useState<string | null>(null);

   const handleEdit = (id: string) => {
      const member = teamMembers.find((m) => m.id === id);
      if (member) {
         setEditingMember(member);
         setView("form");
      }
   };

   const handleDelete = async (id: string) => {
      if (confirm("Are you sure you want to delete this team member?")) {
         setDeletingId(id);
         try {
            const result = await deleteTeamMember({ id });
            if (result.data?.success) {
               toast.success(result.data.message);
               setTeamMembers(teamMembers.filter((m) => m.id !== id));
            }
         } catch (error) {
            toast.error("Failed to delete team member");
         }
         setDeletingId(null);
      }
   };

   const handleCreate = () => {
      setEditingMember(null);
      setView("form");
   };

   const handleSuccess = () => {
      router.refresh();
      setView("table");
      setEditingMember(null);
   };

   const handleCancel = () => {
      setView("table");
      setEditingMember(null);
   };

   return (
      <div className="space-y-6 p-4 md:p-6 pb-24">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold text-primary">Team Management</h1>
               <p className="text-muted-foreground mt-1 text-sm md:text-base">
                  Manage your team members and their roles
               </p>
            </div>
            {view === "table" && (
               <Button onClick={handleCreate} className="gap-2 whitespace-nowrap shadow-md">
                  <Plus className="h-4 w-4" />
                  Add Member
               </Button>
            )}
         </div>

         {view === "table" ? (
            <TeamTable
               data={teamMembers}
               onEdit={handleEdit}
               onDelete={handleDelete}
               isDeleting={deletingId}
            />
         ) : (
            <div className="max-w-3xl mx-auto bg-card p-6 rounded-lg border shadow-sm">
               <h2 className="text-xl font-bold mb-6">
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
               </h2>
               <TeamForm
                  mode={editingMember ? "edit" : "create"}
                  initialData={editingMember ? {
                     ...editingMember,
                     imageAlt: editingMember.imageAlt || undefined
                  } : undefined}
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
               />
            </div>
         )}
      </div>
   );
}
