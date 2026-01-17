"use client";

import { createPortfolioCategory } from "@/actions/portfolio";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { portfolioCategorySchema, type PortfolioCategoryInput } from "@/lib/validations/portfolio";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CategoryFormProps {
   onSuccess?: (category: any) => void;
   onClose?: () => void;
}

export function CategoryForm({ onSuccess, onClose }: CategoryFormProps) {
   const form = useForm<PortfolioCategoryInput>({
      // @ts-expect-error - React Hook Form type compatibility
      resolver: zodResolver(portfolioCategorySchema),
      defaultValues: {
         name: "",
         description: "",
         icon: "",
         color: "",
      },
   });

   const isLoading = form.formState.isSubmitting;

   const onSubmit = async (data: PortfolioCategoryInput) => {
      try {
         const result = await createPortfolioCategory(data);
         if (result.success) {
            toast.success(result.message);
            form.reset();
            onSuccess?.(result.data);
            onClose?.();
         }
      } catch (error) {
         toast.error(error instanceof Error ? error.message : "Something went wrong");
      }
   };

   return (
      <Form {...(form as any)}>
         <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-4">
            <FormField
               control={(form as any).control}
               name="name"
               render={({ field }: any) => (
                  <FormItem>
                     <FormLabel>
                        Category Name <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           placeholder="e.g., Web Development"
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
                     <FormLabel>Description</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Optional description for this category"
                           rows={3}
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
               name="icon"
               render={({ field }: any) => (
                  <FormItem>
                     <FormLabel>Icon</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="e.g., code, palette, etc."
                           {...field}
                           disabled={isLoading}
                        />
                     </FormControl>
                     <FormDescription>Optional icon name</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={(form as any).control}
               name="color"
               render={({ field }: any) => (
                  <FormItem>
                     <FormLabel>Color</FormLabel>
                     <FormControl>
                        <Input
                           type="color"
                           {...field}
                           disabled={isLoading}
                           className="h-10"
                        />
                     </FormControl>
                     <FormDescription>Optional color for the category</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="flex gap-2 pt-4">
               <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Creating..." : "Create Category"}
               </Button>
               <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
               >
                  Cancel
               </Button>
            </div>
         </form>
      </Form>
   );
}
