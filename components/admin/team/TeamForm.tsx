"use client";

import { createTeamMember, updateTeamMember } from "@/actions/team";
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
import { teamMemberSchema, type TeamMemberInput } from "@/lib/validations/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TeamFormProps {
   initialData?: TeamMemberInput & { id?: string };
   onSuccess?: () => void;
   onCancel?: () => void;
   mode: "create" | "edit";
}

export function TeamForm({ initialData, onSuccess, onCancel, mode }: TeamFormProps) {
   const form = useForm<TeamMemberInput>({
      resolver: zodResolver(teamMemberSchema),
      defaultValues: {
         name: initialData?.name || "",
         role: initialData?.role || "",
         bio: initialData?.bio || "",
         image: initialData?.image || "",
         imageAlt: initialData?.imageAlt || "",
      },
   });

   useEffect(() => {
      if (mode === "create") {
         form.reset({
            name: "",
            role: "",
            bio: "",
            image: "",
            imageAlt: "",
         });
      }
   }, [mode, form]);

   const { execute: executeCreate, isExecuting: isCreating } = useAction(createTeamMember, {
      onSuccess: ({ data }) => {
         if (data?.success) {
            toast.success(data.message);
            form.reset();
            onSuccess?.();
         }
      },
      onError: ({ error }) => {
         toast.error(error.serverError || "Failed to create team member");
      },
   });

   const { execute: executeUpdate, isExecuting: isUpdating } = useAction(updateTeamMember, {
      onSuccess: ({ data }) => {
         if (data?.success) {
            toast.success(data.message);
            onSuccess?.();
         }
      },
      onError: ({ error }) => {
         toast.error(error.serverError || "Failed to update team member");
      },
   });

   const isLoading = isCreating || isUpdating;

   const onSubmit = (data: TeamMemberInput) => {
      if (mode === "create") {
         executeCreate(data);
      } else if (initialData?.id) {
         executeUpdate({ id: initialData.id, ...data });
      }
   };

   return (
      <Form {...(form as any)}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
               control={(form as any).control}
               name="name"
               render={({ field }: any) => (
                  <FormItem>
                     <FormLabel>
                        Name <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Enter name"
                           {...field}
                           disabled={isLoading}
                           className={form.formState.errors.name ? "border-red-500" : ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={(form as any).control}
               name="role"
               render={({ field }: any) => (
                  <FormItem>
                     <FormLabel>
                        Role <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Enter role (e.g. CEO, Designer)"
                           {...field}
                           disabled={isLoading}
                           className={form.formState.errors.role ? "border-red-500" : ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={(form as any).control}
               name="bio"
               render={({ field }: any) => (
                  <FormItem>
                     <FormLabel>
                        Bio <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Enter short bio"
                           rows={4}
                           {...field}
                           disabled={isLoading}
                           className={form.formState.errors.bio ? "border-red-500" : ""}
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
               name="image"
               render={({ field }: any) => (
                  <FormItem>
                     <FormLabel>
                        Image URL <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           placeholder="https://example.com/photo.jpg"
                           type="url"
                           {...field}
                           disabled={isLoading}
                           className={form.formState.errors.image ? "border-red-500" : ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={(form as any).control}
               name="imageAlt"
               render={({ field }: any) => (
                  <FormItem>
                     <FormLabel>Image Alt Text</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Describe the image"
                           {...field}
                           value={field.value || ""}
                           disabled={isLoading}
                           className={form.formState.errors.imageAlt ? "border-red-500" : ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="flex justify-end gap-2 fixed bottom-6 right-6 z-50">
               <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="bg-background shadow-lg border-2"
               >
                  Cancel
               </Button>
               <Button
                  type="submit"
                  disabled={isLoading}
                  className="shadow-lg"
               >
                  {isLoading ? (
                     <>
                        <span className="animate-spin mr-2">⏳</span>
                        {mode === "create" ? "Saving..." : "Updating..."}
                     </>
                  ) : (
                     mode === "create" ? "Save Member" : "Update Member"
                  )}
               </Button>
            </div>
         </form>
      </Form>
   );
}
