"use client";

import { reorderPortfolioCategories } from "@/actions/portfolio";
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

interface Category {
   id: string;
   name: string;
   description?: string;
   icon?: string;
   color?: string;
   order: number;
   createdAt: Date;
}

interface CategoryTableProps {
   data: Category[];
   onEdit?: (category: Category) => void;
   onDelete?: (id: string) => Promise<void>;
}

export function CategoryTable({ data, onEdit, onDelete }: CategoryTableProps) {
   const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
   const [draggedItem, setDraggedItem] = useState<string | null>(null);
   const [isReordering, setIsReordering] = useState(false);
   const [localCategories, setLocalCategories] = useState(data);

   const handleDragStart = (e: React.DragEvent, id: string) => {
      setDraggedItem(id);
      e.dataTransfer.effectAllowed = "move";
   };

   const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
   };

   const handleDrop = async (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      if (!draggedItem || draggedItem === targetId) return;

      const draggedIndex = localCategories.findIndex((c) => c.id === draggedItem);
      const targetIndex = localCategories.findIndex((c) => c.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) return;

      // Reorder locally
      const newCategories = [...localCategories];
      const [draggedCategory] = newCategories.splice(draggedIndex, 1);
      newCategories.splice(targetIndex, 0, draggedCategory);

      // Update order values
      const reorderedCategories = newCategories.map((category, index) => ({
         ...category,
         order: index,
      }));

      setLocalCategories(reorderedCategories);
      setDraggedItem(null);

      // Save to server
      setIsReordering(true);
      try {
         const result = await reorderPortfolioCategories(
            reorderedCategories.map((c) => ({ id: c.id, order: c.order }))
         );
         if (!result.success) {
            // Revert on error
            setLocalCategories(data);
         }
      } catch (error) {
         console.error("Error reordering categories:", error);
         setLocalCategories(data);
      } finally {
         setIsReordering(false);
      }
   };

   const handleDelete = async (id: string) => {
      setIsDeletingId(id);
      try {
         await onDelete?.(id);
      } finally {
         setIsDeletingId(null);
      }
   };

   return (
      <>
         {isReordering && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 mb-4">
               Saving order...
            </div>
         )}

         <div className="rounded-lg border overflow-x-auto">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[50px]">Order</TableHead>
                     <TableHead>Name</TableHead>
                     <TableHead>Description</TableHead>
                     <TableHead>Color</TableHead>
                     <TableHead>Created</TableHead>
                     <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {localCategories.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                           No categories found
                        </TableCell>
                     </TableRow>
                  ) : (
                     localCategories.map((category, index) => (
                        <TableRow
                           key={category.id}
                           draggable
                           onDragStart={(e) => handleDragStart(e, category.id)}
                           onDragOver={handleDragOver}
                           onDrop={(e) => handleDrop(e, category.id)}
                           className={`group transition-colors cursor-move ${draggedItem === category.id
                              ? "opacity-50 bg-primary/20"
                              : "odd:bg-white even:bg-primary/5 hover:bg-primary/10"
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
                                    onClick={() => onEdit?.(category)}
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
      </>
   );
}
