// "use client";

// import { createstudent } from "@/app/home/students/_actions/actions";
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
// import { CreatestudentInput, createstudentSchema } from "@/schema/student";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Dispatch, SetStateAction, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// const student_CATEGORIES = [
//   {
//     label: "Art",
//     value: "ART",
//   },
//   {
//     label: "Science",
//     value: "SCIENCE",
//   },
// ];

// interface CreatestudentProps {
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

// const CreateStudentForm = ({ setOpen }: CreatestudentProps) => {
//   const form = useForm<CreatestudentInput>({
//     resolver: zodResolver(createstudentSchema),
//     defaultValues: {
//       name: "",
//       code: "",
//       description: "",
//     },
//   });
//   const handleOptionChange = useCallback(
//     (value: string) => {
//       form.setValue("category", value as "ART" | "SCIENCE");
//     },
//     [form]
//   );
//   const queryClient = useQueryClient();

//   const deleteMutation = useMutation({
//     mutationFn: createstudent,
//     onSuccess: async ({ data }) => {
//       toast.success(data?.message, {
//         id: "create-new-student",
//       });

//       await queryClient.invalidateQueries({
//         queryKey: ["students"],
//       });
//       form.reset();
//       setOpen((prev) => !prev);
//     },
//     onError: () => {
//       toast.error("Something went wrong", {
//         id: "create-new-student",
//       });
//     },
//   });

//   const onSubmit = (data: CreatestudentInput) => {
//     deleteMutation.mutate(data);
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
//                     options={student_CATEGORIES}
//                     label="Category"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <ActionButton label="Create" status={deleteMutation.status} />
//       </form>
//     </Form>
//   );
// };

// export default CreateStudentForm;
