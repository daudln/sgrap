// "use client";

// import { updateProfile } from "@/app/teacher/update-profile";
// import ActionButton from "@/components/action-button";
// import { SelectInput } from "@/components/select-input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { UpdateProfileInput, updateProfileSchema } from "@/schema/profile";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Profile } from "@prisma/client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Dispatch, SetStateAction, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// interface UpdateProfileProps {
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   Profile: Profile;
// }

// const UpdateProfileForm = ({ Profile, setOpen }: UpdateProfileProps) => {
//   const form = useForm<UpdateProfileInput>({
//     resolver: zodResolver(updateProfileSchema),
//     defaultValues: {
//       name: Profile.name,
//       code: Profile.code,
//       description: Profile.description ?? undefined,
//       category: Profile.category,
//       uuid: Profile.uuid,
//     },
//   });
//   const handleOptionChange = useCallback(
//     (value: string) => {
//       form.setValue("category", value as ProfileCategory);
//     },
//     [form]
//   );
//   const queryClient = useQueryClient();

//   const updateMutation = useMutation({
//     mutationFn: updateProfile,
//     onSuccess: async ({ data }) => {
//       toast.success(data?.message, {
//         id: "create-new-Profile",
//       });

//       await queryClient.invalidateQueries({
//         queryKey: ["Profiles"],
//       });
//       form.reset();
//       setOpen((prev) => !prev);
//     },
//     onError: (error) => {
//       toast.error("Something went wrong", {
//         id: "create-new-Profile",
//       });
//     },
//   });

//   const onSubmit = (data: UpdateProfileInput) => {
//     updateMutation.mutate(data);
//   };
//   return (
//     <Form {...form}>
//       <form
//         className="w-full max-w-lg flex flex-col gap-4"
//         onSubmit={form.handleSubmit(onSubmit)}
//       >
//         <div>
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Kiswahili" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="code"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Code</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="KSW" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Description (optional)" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem className="flex flex-col my-2">
//                 <FormLabel>Category</FormLabel>
//                 <FormControl>
//                   <SelectInput
//                     onChange={handleOptionChange}
//                     className="w-full"
//                     options={Profile_CATEGORIES}
//                     label="Category"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="uuid"
//             render={({ field }) => (
//               <FormItem hidden>
//                 <FormControl>
//                   <Input {...field} hidden readOnly />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <ActionButton label="Update" status={updateMutation.status} />
//       </form>
//     </Form>
//   );
// };

// export default UpdateProfileForm;
