// "use client";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { deleteTeacher } from "../_actions/actions";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  teacherId: string;
}

// function DeleteTeacherDialog({ open, setOpen, teacherId }: Props) {
//   const queryClient = useQueryClient();

//   const deleteMutation = useMutation({
//     mutationFn: deleteTeacher,
//     onSuccess: async ({ data }) => {
//       toast.success(data?.message, {
//         id: teacherId,
//       });

//       await queryClient.invalidateQueries({
//         queryKey: ["teachers"],
//       });
//     },
//     onError: () => {
//       toast.error("Something went wrong", {
//         id: teacherId,
//       });
//     },
//   });
//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete this
//             teacher
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             className="bg-destructive"
//             onClick={() => {
//               toast.loading("Deleting teacher...", {
//                 id: teacherId,
//               });
//               deleteMutation.mutate({ uuid: teacherId });
//             }}
//           >
//             Continue
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default DeleteTeacherDialog;

import React from "react";

const DeleteTeacherDialog = ({ open, setOpen, teacherId }: Props) => {
  return <div>DeleteTeacherDialog</div>;
};

export default DeleteTeacherDialog;
