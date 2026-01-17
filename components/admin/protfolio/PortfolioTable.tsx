"use client";

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
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface Portfolio {
   id: string;
   title: string;
   categoryId: string;
   category: { id: string; name: string } | string;
   tags: string[];
   status: string;
   featured: boolean;
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

   const truncateText = (text: string, maxLength: number = 50) => {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
   };

   const isTextOverflow = (text: string, maxLength: number = 50) => {
      return text.length > maxLength;
   };

   return (
      <>
         <div className="rounded-lg border">
            <Table>
               <TableHeader>
                  <TableRow>
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
                  {data.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                           No portfolios found
                        </TableCell>
                     </TableRow>
                  ) : (
                     data.map((portfolio) => (
                        <TableRow key={portfolio.id}>
                           <TableCell>
                              <div
                                 className={cn(
                                    isTextOverflow(portfolio.title) && "cursor-pointer text-primary/60 hover:text-primary"
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
