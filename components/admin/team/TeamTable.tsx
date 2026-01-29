"use client";

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
import { Edit2, Loader2, Trash2 } from "lucide-react";

interface TeamMember {
   id: string;
   name: string;
   role: string;
   bio: string;
   image: string;
   createdAt: Date;
}

interface TeamTableProps {
   data: TeamMember[];
   onEdit: (id: string) => void;
   onDelete: (id: string) => void;
   isDeleting?: string | null;
}

export function TeamTable({ data, onEdit, onDelete, isDeleting }: TeamTableProps) {
   return (
      <div className="rounded-lg border shadow-sm">
         <div className="max-h-[600px] overflow-auto flex flex-col relative">
            <Table>
               <TableHeader className="sticky top-0 z-10 bg-muted/90 backdrop-blur shadow-sm">
                  <TableRow>
                     <TableHead className="w-[100px]">Image</TableHead>
                     <TableHead>Name</TableHead>
                     <TableHead>Role</TableHead>
                     <TableHead className="max-w-[300px]">Bio</TableHead>
                     <TableHead>Joined</TableHead>
                     <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {data.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                           No team members found
                        </TableCell>
                     </TableRow>
                  ) : (
                     data.map((member) => (
                        <TableRow
                           key={member.id}
                           className="odd:bg-white even:bg-primary/5 hover:bg-primary/10 transition-colors"
                        >
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
   );
}
