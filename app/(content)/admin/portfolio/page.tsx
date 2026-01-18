"use client";

import { deletePortfolio, getPortfolioCategories, getPortfolios } from "@/actions/portfolio";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Portfolio {
   id: string;
   title: string;
   description: string | null;
   categoryId: string;
   category: { id: string; name: string } | string;
   image: string;
   tags: string[];
   featured: boolean;
   status: string;
   createdAt: Date;
   updatedAt: Date;
}

interface Category {
   id: string;
   name: string;
   description?: string;
   icon?: string;
   color?: string;
   createdAt: Date;
}

export default function AdminPortfolioPage() {
   const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
   const [categories, setCategories] = useState<Category[]>([]);
   const [isOpen, setIsOpen] = useState(false);
   const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
   const [editingId, setEditingId] = useState<string | null>(null);
   const [editingData, setEditingData] = useState<Portfolio | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
   const [activeTab, setActiveTab] = useState("portfolios");

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      setIsLoading(true);
      try {
         const [portfolioResult, categoryResult] = await Promise.all([
            getPortfolios(),
            getPortfolioCategories(),
         ]);

         if (portfolioResult.success && portfolioResult.data) {
            setPortfolios(portfolioResult.data as Portfolio[]);
         }
         if (categoryResult.success && categoryResult.data) {
            setCategories(categoryResult.data);
         }
      } catch (error) {
         toast.error("Failed to fetch data");
      }
      setIsLoading(false);
   };

   const handleDelete = async (id: string) => {
      setIsDeletingId(id);
      try {
         const result = await deletePortfolio(id);
         if (result.success) {
            toast.success(result.message);
            await fetchData();
         }
      } catch (error) {
         toast.error(error instanceof Error ? error.message : "Failed to delete portfolio");
      }
      setIsDeletingId(null);
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

   const handleSuccess = async () => {
      await fetchData();
      setIsOpen(false);
      setEditingId(null);
      setEditingData(null);
   };

   const handleCategoriesChange = (updatedCategories: Array<{ id: string; name: string }>) => {
      setCategories(updatedCategories as Category[]);
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold">Portfolio Management</h1>
               <p className="text-muted-foreground mt-1">
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
                  className="gap-2"
               >
                  <Plus className="h-4 w-4" />
                  New Project
               </Button>
            )}
            {activeTab === "categories" && (
               <Button
                  onClick={() => setIsCategoryDialogOpen(true)}
                  className="gap-2"
               >
                  <Plus className="h-4 w-4" />
                  New Category
               </Button>
            )}
         </div>

         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
               <TabsTrigger value="portfolios">Projects</TabsTrigger>
               <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolios" className="space-y-4">
               {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                     Loading portfolios...
                  </div>
               ) : (
                  <PortfolioTable
                     data={portfolios}
                     onEdit={handleEdit}
                     onDelete={handleDelete}
                     isDeleting={isDeletingId}
                  />
               )}
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
               {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                     Loading categories...
                  </div>
               ) : (
                  <CategoryTable data={categories} onRefresh={fetchData} />
               )}
            </TabsContent>
         </Tabs>

         <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                     tags: editingData.tags,
                     featured: editingData.featured,
                     status: editingData.status as "PUBLISHED" | "DRAFT",
                     id: editingData.id,
                  } : undefined}
                  onSuccess={handleSuccess}
                  mode={editingId ? "edit" : "create"}
                  categories={categories.map((c) => ({ id: c.id, name: c.name }))}
                  onCategoriesChange={handleCategoriesChange}
               />
            </DialogContent>
         </Dialog>

         <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogContent className="max-w-md">
               <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                     Add a new portfolio category to organize your projects
                  </DialogDescription>
               </DialogHeader>
               <CategoryForm
                  onSuccess={() => {
                     fetchData();
                     setIsCategoryDialogOpen(false);
                  }}
                  onClose={() => setIsCategoryDialogOpen(false)}
               />
            </DialogContent>
         </Dialog>
      </div>
   );
}
