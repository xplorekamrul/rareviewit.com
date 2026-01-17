"use client";

import { deletePortfolioCategory } from "@/actions/portfolio";
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
import { useState } from "react";
import { toast } from "sonner";

interface Category {
   id: string;
   name: string;
   description?: string;
   icon?: string;
   color?: string;
   createdAt: Date;
}

interface CategoryTableProps {
   data: Category[];
   onRefresh: () => void;
}

export function CategoryTable({ data, onRefresh }: CategoryTableProps) {
   const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

   const handleDelete = async (id: string) => {
      setIsDeletingId(id);
      try {
         const result = await deletePortfolioCategory(id);
         if (result.success) {
            toast.success(result.message);
            onRefresh();
         }
      } catch (error) {
         toast.error(error instanceof Error ? error.message : "Failed to delete category");
      }
      setIsDeletingId(null);
   };

   return (
      <div className="rounded-lg border">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.length === 0 ? (
                  <TableRow>
                     <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No categories found
                     </TableCell>
                  </TableRow>
               ) : (
                  data.map((category) => (
                     <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                           {category.description ? category.description.substring(0, 50) + "..." : "-"}
                        </TableCell>
                        <TableCell>
                           {category.color && (
                              <div
                                 className="w-6 h-6 rounded border"
                                 style={{ backgroundColor: category.color }}
                              />
                           )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                           {new Date(category.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                           <div className="flex justify-end gap-2">
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 disabled={isDeletingId === category.id}
                              >
                                 <Edit2 className="h-4 w-4 text-primary" />
                              </Button>
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 onClick={() => handleDelete(category.id)}
                                 disabled={isDeletingId === category.id}
                              >
                                 {isDeletingId === category.id ? (
                                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                                 ) : (
                                    <Trash2 className="h-4 w-4 text-primary" />
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
   );
}
