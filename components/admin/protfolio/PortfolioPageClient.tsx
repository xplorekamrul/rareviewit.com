"use client";

import { deletePortfolio, deletePortfolioCategory } from "@/actions/portfolio";
import { CategoryForm } from "@/components/admin/protfolio/CategoryForm";
import { CategoryTable } from "@/components/admin/protfolio/CategoryTable";
import { PortfolioForm } from "@/components/admin/protfolio/PortfolioForm";
import { PortfolioTable } from "@/components/admin/protfolio/PortfolioTable";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Portfolio {
   id: string;
   title: string;
   description: string | null;
   categoryId: string;
   category: { id: string; name: string } | string;
   image: string;
   url: string | null;
   tags: string[];
   featured: boolean;
   status: string;
   order: number;
   createdAt: Date;
   updatedAt: Date;
}

interface Category {
   id: string;
   name: string;
   description?: string;
   icon?: string;
   color?: string;
   order: number;
   createdAt: Date;
}

interface PortfolioPageClientProps {
   initialPortfolios: Portfolio[];
   initialCategories: Category[];
}

export function PortfolioPageClient({
   initialPortfolios,
   initialCategories,
}: PortfolioPageClientProps) {
   const [portfolios, setPortfolios] = useState<Portfolio[]>(initialPortfolios);
   const [categories, setCategories] = useState<Category[]>(initialCategories);
   const [isOpen, setIsOpen] = useState(false);
   const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
   const [editingId, setEditingId] = useState<string | null>(null);
   const [editingData, setEditingData] = useState<Portfolio | null>(null);
   const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
   const [editingCategoryData, setEditingCategoryData] = useState<Category | null>(null);
   const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
   const [activeTab, setActiveTab] = useState("categories");

   const handleDelete = async (id: string) => {
      setIsDeletingId(id);
      try {
         const result = await deletePortfolio(id);
         if (result.success) {
            toast.success(result.message);
            setPortfolios(portfolios.filter((p) => p.id !== id));
         }
      } catch (error) {
         toast.error(error instanceof Error ? error.message : "Failed to delete portfolio");
      }
      setIsDeletingId(null);
   };

   const handleDeleteCategory = async (id: string) => {
      try {
         const result = await deletePortfolioCategory(id);
         if (result.success) {
            toast.success(result.message);
            setCategories(categories.filter((c) => c.id !== id));
         }
      } catch (error) {
         toast.error(error instanceof Error ? error.message : "Failed to delete category");
      }
   };

   const handleEdit = (id: string) => {
      const portfolio = portfolios.find((p) => p.id === id);
      if (portfolio) {
         setEditingId(id);
         setEditingData(portfolio);
         setIsOpen(true);
      }
   };

   const handleOpenChange = (open: boolean) => {
      if (!open) {
         setEditingId(null);
         setEditingData(null);
      }
      setIsOpen(open);
   };

   const handleCategoryOpenChange = (open: boolean) => {
      if (!open) {
         setEditingCategoryId(null);
         setEditingCategoryData(null);
      }
      setIsCategoryDialogOpen(open);
   };

   const handleEditCategory = (category: Category) => {
      setEditingCategoryId(category.id);
      setEditingCategoryData(category);
      setIsCategoryDialogOpen(true);
   };

   const handlePortfolioSuccess = (newPortfolio: Portfolio | null) => {
      if (newPortfolio) {
         if (editingId) {
            // Update existing
            setPortfolios(prev =>
               prev.map(p => (p.id === newPortfolio.id ? newPortfolio : p))
            );
         } else {
            // Add new
            setPortfolios(prev => [newPortfolio, ...prev]);
         }
      }
      setIsOpen(false);
      setEditingId(null);
      setEditingData(null);
   };

   const handleCategorySuccess = (newCategory: Category | null) => {
      if (newCategory) {
         if (editingCategoryId) {
            // Update existing
            setCategories(prev =>
               prev.map(c => (c.id === newCategory.id ? newCategory : c))
            );
         } else {
            // Add new
            setCategories(prev => [newCategory, ...prev]);
         }
      }
      setIsCategoryDialogOpen(false);
      setEditingCategoryId(null);
      setEditingCategoryData(null);
   };

   return (
      <div className="space-y-6 p-4 md:p-6">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold">Portfolio Management</h1>
               <p className="text-muted-foreground mt-1 text-sm md:text-base">
                  Create and manage your portfolio projects and categories
               </p>
            </div>
            {activeTab === "portfolios" && (
               <Button
                  onClick={() => {
                     setEditingId(null);
                     setEditingData(null);
                     setIsOpen(true);
                  }}
                  className="gap-2 whitespace-nowrap"
               >
                  <Plus className="h-4 w-4" />
                  New Project
               </Button>
            )}
            {activeTab === "categories" && (
               <Button
                  onClick={() => setIsCategoryDialogOpen(true)}
                  className="gap-2 whitespace-nowrap"
               >
                  <Plus className="h-4 w-4" />
                  New Category
               </Button>
            )}
         </div>

         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
               <TabsTrigger value="categories">Categories</TabsTrigger>
               <TabsTrigger value="portfolios">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolios" className="space-y-4">
               <div className="overflow-x-auto">
                  <PortfolioTable
                     data={portfolios}
                     onEdit={handleEdit}
                     onDelete={handleDelete}
                     isDeleting={isDeletingId}
                  />
               </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
               <div className="overflow-x-auto">
                  <CategoryTable
                     data={categories}
                     onEdit={handleEditCategory}
                     onDelete={handleDeleteCategory}
                  />
               </div>
            </TabsContent>
         </Tabs>

         <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
               <DialogHeader>
                  <DialogTitle>
                     {editingId ? "Edit Portfolio" : "Create New Portfolio"}
                  </DialogTitle>
                  <DialogDescription>
                     {editingId
                        ? "Update the portfolio project details"
                        : "Add a new portfolio project to showcase your work"}
                  </DialogDescription>
               </DialogHeader>
               <PortfolioForm
                  initialData={editingData ? {
                     title: editingData.title,
                     description: editingData.description || "",
                     categoryId: editingData.categoryId,
                     image: editingData.image,
                     url: editingData.url || undefined,
                     tags: editingData.tags,
                     featured: editingData.featured,
                     status: editingData.status as "PUBLISHED" | "DRAFT",
                     order: editingData.order,
                     id: editingData.id,
                  } : undefined}
                  onSuccess={handlePortfolioSuccess}
                  mode={editingId ? "edit" : "create"}
                  categories={categories.map((c) => ({ id: c.id, name: c.name }))}
               />
            </DialogContent>
         </Dialog>

         <Dialog open={isCategoryDialogOpen} onOpenChange={handleCategoryOpenChange}>
            <DialogContent className="max-w-md">
               <DialogHeader>
                  <DialogTitle>
                     {editingCategoryId ? "Edit Category" : "Create New Category"}
                  </DialogTitle>
                  <DialogDescription>
                     {editingCategoryId
                        ? "Update the category details"
                        : "Add a new portfolio category to organize your projects"}
                  </DialogDescription>
               </DialogHeader>
               <CategoryForm
                  initialData={editingCategoryData ? {
                     name: editingCategoryData.name,
                     description: editingCategoryData.description || "",
                     icon: editingCategoryData.icon || "",
                     color: editingCategoryData.color || "",
                     order: editingCategoryData.order,
                  } : undefined}
                  categoryId={editingCategoryId || undefined}
                  onSuccess={handleCategorySuccess}
                  onClose={() => {
                     setIsCategoryDialogOpen(false);
                     setEditingCategoryId(null);
                     setEditingCategoryData(null);
                  }}
               />
            </DialogContent>
         </Dialog>
      </div>
   );
}
