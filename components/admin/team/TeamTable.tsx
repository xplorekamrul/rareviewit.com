"use client";

import { reorderTeamMembers } from "@/actions/team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Edit2, GripVertical, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface TeamMember {
   id: string;
   name: string;
   role: string;
   bio: string;
   image: string;
   order: number;
   createdAt: Date;
}

interface TeamTableProps {
   data: TeamMember[];
   onEdit: (id: string) => void;
   onDelete: (id: string) => void;
   isDeleting?: string | null;
}

export function TeamTable({ data, onEdit, onDelete, isDeleting }: TeamTableProps) {
   const [draggedItem, setDraggedItem] = useState<string | null>(null)
   const [isReordering, setIsReordering] = useState(false)
   const [localTeamMembers, setLocalTeamMembers] = useState(data)

   const handleDragStart = (e: React.DragEvent, id: string) => {
      setDraggedItem(id)
      e.dataTransfer.effectAllowed = 'move'
   }

   const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
   }

   const handleDrop = async (e: React.DragEvent, targetId: string) => {
      e.preventDefault()
      if (!draggedItem || draggedItem === targetId) return

      const draggedIndex = localTeamMembers.findIndex(m => m.id === draggedItem)
      const targetIndex = localTeamMembers.findIndex(m => m.id === targetId)

      if (draggedIndex === -1 || targetIndex === -1) return

      // Reorder locally
      const newTeamMembers = [...localTeamMembers]
      const [draggedMember] = newTeamMembers.splice(draggedIndex, 1)
      newTeamMembers.splice(targetIndex, 0, draggedMember)

      // Update order values
      const reorderedTeamMembers = newTeamMembers.map((member, index) => ({
         ...member,
         order: index,
      }))

      setLocalTeamMembers(reorderedTeamMembers)
      setDraggedItem(null)

      // Save to server
      setIsReordering(true)
      try {
         const result = await reorderTeamMembers({
            teamMembers: reorderedTeamMembers.map(m => ({ id: m.id, order: m.order })),
         })
         if (!result.data?.success) {
            // Revert on error
            setLocalTeamMembers(data)
         }
      } catch (error) {
         console.error('Error reordering team members:', error)
         setLocalTeamMembers(data)
      } finally {
         setIsReordering(false)
      }
   }

   return (
      <div className="space-y-4">
         {isReordering && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
               Saving order...
            </div>
         )}

         <div className="rounded-lg border shadow-sm">
            <div className="max-h-[600px] overflow-auto flex flex-col relative">
               <Table>
                  <TableHeader className="sticky top-0 z-10 bg-muted/90 backdrop-blur shadow-sm">
                     <TableRow>
                        <TableHead className="w-[50px]">Order</TableHead>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="max-w-[300px]">Bio</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {localTeamMembers.length === 0 ? (
                        <TableRow>
                           <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No team members found
                           </TableCell>
                        </TableRow>
                     ) : (
                        localTeamMembers.map((member, index) => (
                           <TableRow
                              key={member.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, member.id)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, member.id)}
                              className={`group transition-colors cursor-move ${draggedItem === member.id ? 'opacity-50 bg-primary/20' : 'odd:bg-white even:bg-primary/5 hover:bg-primary/10'
                                 }`}
                           >
                              <TableCell className="font-medium">
                                 <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                                       {index}
                                    </span>
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <div className="h-10 w-10 overflow-hidden rounded-full border">
                                    <img
                                       src={member.image}
                                       alt={member.name}
                                       className="h-full w-full object-cover"
                                    />
                                 </div>
                              </TableCell>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>
                                 <Badge variant="outline">{member.role}</Badge>
                              </TableCell>
                              <TableCell className="truncate max-w-[300px]" title={member.bio}>
                                 {member.bio}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                 {new Date(member.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                 <div className="flex justify-end gap-2">
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => onEdit(member.id)}
                                       disabled={isDeleting === member.id}
                                    >
                                       <Edit2 className="h-4 w-4 text-primary" />
                                    </Button>
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => onDelete(member.id)}
                                       disabled={isDeleting === member.id}
                                    >
                                       {isDeleting === member.id ? (
                                          <Loader2 className="h-4 w-4 text-primary animate-spin" />
                                       ) : (
                                          <Trash2 className="h-4 w-4 text-destructive" />
                                       )}
                                    </Button>
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))
                     )}
                  </TableBody>
               </Table>
            </div>
         </div>
      </div>
   );
}
