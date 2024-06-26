// "use client";

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
// import { useSchoolOptions } from "@/hooks/useSchools";
// import { GENDER_OPTIONS } from "@/lib/constants";
// import { CreateTeacherInput, createTeacherSchema } from "@/schema/teacher";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Gender } from "@prisma/client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Dispatch, SetStateAction, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { createTeacher } from "../_actions/actions";

interface CreateTeacherProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// const CreateTeacherForm = ({ setOpen }: CreateTeacherProps & {}) => {
//   const form = useForm<CreateTeacherInput>({
//     resolver: zodResolver(createTeacherSchema),
//     defaultValues: {
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       email: "",
//       phoneNumber: "",
//       school: "",
//       gender: "" as "MALE" | "FEMALE",
//     },
//   });

//   const SCHOOLS = useSchoolOptions();

//   const handleOptionChange = useCallback(
//     (value: string) => {
//       form.setValue("school", value);
//     },
//     [form]
//   );

//   const handleGenderChange = useCallback(
//     (value: string) => {
//       form.setValue("gender", value as Gender);
//     },
//     [form]
//   );

//   const queryClient = useQueryClient();

//   const createMutation = useMutation({
//     mutationFn: createTeacher,
//     onSuccess: async ({ data }) => {
//       toast.success(data?.message, {
//         id: "delete-new-teacher",
//       });

//       await queryClient.invalidateQueries({
//         queryKey: ["teachers"],
//       });
//       form.reset();
//       setOpen((prev) => !prev);
//     },
//     onError: () => {
//       toast.error("Something went wrong", {
//         id: "create-new-teacher",
//       });
//     },
//   });

//   const onSubmit = (data: CreateTeacherInput) => {
//     createMutation.mutate(data);
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
//             name="firstName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Daud" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="middleName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Middle Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Linus (optional)" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="lastName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Namayala" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="gender"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Gender</FormLabel>
//                 <FormControl>
//                   <SelectInput
//                     onChange={handleGenderChange}
//                     className="w-full"
//                     options={GENDER_OPTIONS || []}
//                     label="Gender"
//                     placeholder="Select Gender"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="daudnamayala@gmail.com" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="phoneNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone Number</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="+255712345678" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="school"
//             render={({ field }) => (
//               <FormItem className="flex flex-col my-2">
//                 <FormLabel>School</FormLabel>
//                 <FormControl className="w-full">
//                   <SelectInput
//                     onChange={handleOptionChange}
//                     className="w-full"
//                     options={SCHOOLS || []}
//                     label="School"
//                     placeholder="Select School"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <ActionButton label="Create" status={createMutation.status} />
//       </form>
//     </Form>
//   );
// };

// export default CreateTeacherForm;

import React, { Dispatch, SetStateAction } from "react";

const CreateTeacherForm = ({ setOpen }: CreateTeacherProps) => {
  return <div>CreateTeacherForm</div>;
};

export default CreateTeacherForm;
