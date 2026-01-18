"use client";

import { createPortfolio, updatePortfolio } from "@/actions/portfolio";
import { CustomSelect } from "@/components/shared/custom-select";
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
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { portfolioSchema, type PortfolioInput } from "@/lib/validations/portfolio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryForm } from "./CategoryForm";

interface PortfolioFormProps {
   initialData?: PortfolioInput & { id?: string };
   onSuccess?: () => void;
   mode: "create" | "edit";
   categories: Array<{ id: string; name: string }>;
   onCategoriesChange?: (categories: Array<{ id: string; name: string }>) => void;
}

export function PortfolioForm({
   initialData,
   onSuccess,
   mode,
   categories,
   onCategoriesChange,
}: PortfolioFormProps) {
   const [showCategoryDialog, setShowCategoryDialog] = useState(false);
   const [localCategories, setLocalCategories] = useState(categories);

   const form = useForm<PortfolioInput>({
      // @ts-expect-error - React Hook Form type compatibility
      resolver: zodResolver(portfolioSchema),
      defaultValues: {
         title: initialData?.title || "",
         description: initialData?.description || "",
         categoryId: initialData?.categoryId || "",
         image: initialData?.image || "",
         tags: initialData?.tags || [],
         featured: initialData?.featured || false,
         status: initialData?.status || "PUBLISHED",
      },
   });

   useEffect(() => {
      if (mode === "create") {
         form.reset({
            title: "",
            description: "",
            categoryId: "",
            image: "",
            tags: [],
            featured: false,
            status: "PUBLISHED",
         });
      }
   }, [mode, form]);

   const tags = form.watch("tags");
   const isLoading = form.formState.isSubmitting;

   const handleAddTag = (tag: string) => {
      if (tag.trim() && !tags.includes(tag.trim()) && tags.length < 10) {
         form.setValue("tags", [...tags, tag.trim()]);
      }
   };

   const handleRemoveTag = (index: number) => {
      form.setValue(
         "tags",
         tags.filter((_, i) => i !== index)
      );
   };

   const handleCategoryCreated = (newCategory: any) => {
      const updatedCategories = [...localCategories, { id: newCategory.id, name: newCategory.name }];
      setLocalCategories(updatedCategories);
      onCategoriesChange?.(updatedCategories);
      form.setValue("categoryId", newCategory.id);
   };

   const onSubmit = async (data: PortfolioInput) => {
      try {
         if (mode === "create") {
            const result = await createPortfolio(data);
            if (result.success) {
               toast.success(result.message);
               form.reset();
               onSuccess?.();
            }
         } else if (initialData?.id) {
            const result = await updatePortfolio(initialData.id, data);
            if (result.success) {
               toast.success(result.message);
               onSuccess?.();
            }
         }
      } catch (error) {
         toast.error(error instanceof Error ? error.message : "Something went wrong");
      }
   };

   return (
      <>
         <Form {...(form as any)}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
               <FormField
                  control={(form as any).control}
                  name="title"
                  render={({ field }: any) => (
                     <FormItem>
                        <FormLabel>
                           Title <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Enter project title"
                              {...field}
                              disabled={isLoading}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={(form as any).control}
                  name="description"
                  render={({ field }: any) => (
                     <FormItem>
                        <FormLabel>
                           Description <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Textarea
                              placeholder="Enter project description"
                              rows={4}
                              {...field}
                              disabled={isLoading}
                           />
                        </FormControl>
                        <FormDescription>
                           Minimum 10 characters, maximum 2000 characters
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={(form as any).control}
                  name="categoryId"
                  render={({ field }: any) => (
                     <FormItem>
                        <FormLabel>
                           Category <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex gap-2">
                           <div className="flex-1">
                              <FormControl>
                                 <CustomSelect
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    options={localCategories.map((cat) => ({
                                       value: cat.id,
                                       label: cat.name,
                                    }))}
                                    placeholder="Select a category"
                                    searchable
                                    searchPlaceholder="Search categories..."
                                    disabled={isLoading}
                                 />
                              </FormControl>
                           </div>
                           <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => setShowCategoryDialog(true)}
                              disabled={isLoading}
                              title="Create new category"
                           >
                              <Plus className="h-4 w-4" />
                           </Button>
                        </div>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={(form as any).control}
                  name="image"
                  render={({ field }: any) => (
                     <FormItem>
                        <FormLabel>
                           Image URL <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Input
                              placeholder="https://example.com/image.jpg"
                              type="url"
                              {...field}
                              disabled={isLoading}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={(form as any).control}
                  name="tags"
                  render={({ field }: any) => (
                     <FormItem>
                        <FormLabel>
                           Tags <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="space-y-2">
                           <Input
                              placeholder="Add a tag and press Enter"
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTag(e.currentTarget.value);
                                    e.currentTarget.value = "";
                                 }
                              }}
                              disabled={isLoading || tags.length >= 10}
                           />
                           <div className="flex flex-wrap gap-2">
                              {tags.map((tag, index) => (
                                 <Badge key={index} variant="secondary" className="gap-1">
                                    {tag}
                                    <button
                                       type="button"
                                       onClick={() => handleRemoveTag(index)}
                                       className="ml-1 hover:text-destructive"
                                    >
                                       <X className="h-3 w-3" />
                                    </button>
                                 </Badge>
                              ))}
                           </div>
                        </div>
                        <FormDescription>
                           Add up to 10 tags. Press Enter to add.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={(form as any).control}
                  name="status"
                  render={({ field }: any) => (
                     <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                              <SelectTrigger disabled={isLoading}>
                                 <SelectValue />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              <SelectItem value="PUBLISHED">Published</SelectItem>
                              <SelectItem value="DRAFT">Draft</SelectItem>
                           </SelectContent>
                        </Select>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={(form as any).control}
                  name="featured"
                  render={({ field }: any) => (
                     <FormItem className="flex items-center gap-2">
                        <FormControl>
                           <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              disabled={isLoading}
                              className="h-4 w-4 rounded border-gray-300"
                           />
                        </FormControl>
                        <FormLabel className="mb-0 flex items-center gap-1">
                           <Star className="h-4 w-4" />
                           Featured Project
                        </FormLabel>
                     </FormItem>
                  )}
               />

               <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Saving..." : mode === "create" ? "Create Portfolio" : "Update Portfolio"}
               </Button>
            </form>
         </Form>

         <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                     Add a new portfolio category
                  </DialogDescription>
               </DialogHeader>
               <CategoryForm
                  onSuccess={handleCategoryCreated}
                  onClose={() => setShowCategoryDialog(false)}
               />
            </DialogContent>
         </Dialog>
      </>
   );
}
