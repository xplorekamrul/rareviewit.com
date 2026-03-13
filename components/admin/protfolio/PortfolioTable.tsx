"use client";

import { reorderPortfolios } from "@/actions/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Edit2, GripVertical, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface Portfolio {
   id: string;
   title: string;
   categoryId: string;
   category: { id: string; name: string } | string;
   tags: string[];
   status: string;
   featured: boolean;
   order: number;
   createdAt: Date;
}

interface PortfolioTableProps {
   data: Portfolio[];
   onEdit: (id: string) => void;
   onDelete: (id: string) => Promise<void>;
   isDeleting?: string | null;
}

export function PortfolioTable({
   data,
   onEdit,
   onDelete,
   isDeleting,
}: PortfolioTableProps) {
   const [expandedText, setExpandedText] = useState<string | null>(null);
   const [draggedItem, setDraggedItem] = useState<string | null>(null);
   const [isReordering, setIsReordering] = useState(false);
   const [localPortfolios, setLocalPortfolios] = useState(data);

   const truncateText = (text: string, maxLength: number = 50) => {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
   };

   const isTextOverflow = (text: string, maxLength: number = 50) => {
      return text.length > maxLength;
   };

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

      const draggedIndex = localPortfolios.findIndex((p) => p.id === draggedItem);
      const targetIndex = localPortfolios.findIndex((p) => p.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) return;

      // Reorder locally
      const newPortfolios = [...localPortfolios];
      const [draggedPortfolio] = newPortfolios.splice(draggedIndex, 1);
      newPortfolios.splice(targetIndex, 0, draggedPortfolio);

      // Update order values
      const reorderedPortfolios = newPortfolios.map((portfolio, index) => ({
         ...portfolio,
         order: index,
      }));

      setLocalPortfolios(reorderedPortfolios);
      setDraggedItem(null);

      // Save to server
      setIsReordering(true);
      try {
         const result = await reorderPortfolios(
            reorderedPortfolios.map((p) => ({ id: p.id, order: p.order }))
         );
         if (!result.success) {
            // Revert on error
            setLocalPortfolios(data);
         }
      } catch (error) {
         console.error("Error reordering portfolios:", error);
         setLocalPortfolios(data);
      } finally {
         setIsReordering(false);
      }
   };

   return (
      <>
         {isReordering && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 mb-4">
               Saving order...
            </div>
         )}

         <div className="rounded-lg border">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[50px]">Order</TableHead>
                     <TableHead>Title</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>Tags</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead>Featured</TableHead>
                     <TableHead>Created</TableHead>
                     <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {localPortfolios.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                           No portfolios found
                        </TableCell>
                     </TableRow>
                  ) : (
                     localPortfolios.map((portfolio, index) => (
                        <TableRow
                           key={portfolio.id}
                           draggable
                           onDragStart={(e) => handleDragStart(e, portfolio.id)}
                           onDragOver={handleDragOver}
                           onDrop={(e) => handleDrop(e, portfolio.id)}
                           className={`group transition-colors cursor-move ${draggedItem === portfolio.id
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
                           <TableCell>
                              <div
                                 className={cn(
                                    isTextOverflow(portfolio.title) &&
                                    "cursor-pointer text-primary/60 hover:text-primary"
                                 )}
                                 onClick={() => {
                                    if (isTextOverflow(portfolio.title)) {
                                       setExpandedText(portfolio.title);
                                    }
                                 }}
                              >
                                 {truncateText(portfolio.title)}
                              </div>
                           </TableCell>
                           <TableCell>
                              <Badge variant="outline">
                                 {typeof portfolio.category === "string"
                                    ? portfolio.category
                                    : portfolio.category?.name || "Unknown"}
                              </Badge>
                           </TableCell>
                           <TableCell>
                              <div className="flex flex-wrap gap-1">
                                 {portfolio.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                       {tag}
                                    </Badge>
                                 ))}
                                 {portfolio.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                       +{portfolio.tags.length - 2}
                                    </Badge>
                                 )}
                              </div>
                           </TableCell>
                           <TableCell>
                              <Badge
                                 variant={portfolio.status === "PUBLISHED" ? "default" : "secondary"}
                              >
                                 {portfolio.status}
                              </Badge>
                           </TableCell>
                           <TableCell>
                              {portfolio.featured ? (
                                 <Badge variant="outline" className="bg-yellow-50">
                                    ⭐ Featured
                                 </Badge>
                              ) : (
                                 <span className="text-muted-foreground text-sm">-</span>
                              )}
                           </TableCell>
                           <TableCell className="text-sm text-muted-foreground">
                              {new Date(portfolio.createdAt).toLocaleDateString()}
                           </TableCell>
                           <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onEdit(portfolio.id)}
                                    disabled={isDeleting === portfolio.id}
                                 >
                                    <Edit2 className="h-4 w-4 text-primary" />
                                 </Button>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onDelete(portfolio.id)}
                                    disabled={isDeleting === portfolio.id}
                                 >
                                    {isDeleting === portfolio.id ? (
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

         {/* Text Expansion Dialog */}
         <Dialog open={!!expandedText} onOpenChange={() => setExpandedText(null)}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Full Text</DialogTitle>
               </DialogHeader>
               <DialogDescription className="text-foreground break-words">
                  {expandedText}
               </DialogDescription>
            </DialogContent>
         </Dialog>
      </>
   );
}
