// "use client";

// import { APIResponse } from "@/services/api.service";
// import { Profile, Subject } from "@prisma/client";
// import { useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import UpdateSubjectForm from "./update-teacher-form";
// import DialogBox from "@/components/dialog-box";
// import { Dispatch, SetStateAction } from "react";

// interface Props {
//   open: boolean;
//   subjectId: string;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

// function UpdateSubjectDialog({ subjectId, open, setOpen }: Props) {
//   const queryClient = useQueryClient();
//   const teachers = queryClient.getQueryData<APIResponse<Profile>>([
//     "teachers",
//   ])?.data;
//   const teacher = teachers?.find((teacher) => teacher.uuid === teacherId) as
//     | teacher
//     | undefined;
//   if (!teacher)
//     toast.error("Something went wrong", {
//       id: teacherId,
//     });

//   return (
//     <DialogBox
//       open={open}
//       onOpenChange={setOpen}
//       title="Update teacher"
//       description="Update the teacher details"
//     >
//       <UpdateteacherForm teacher={teacher!} setOpen={setOpen} />
//     </DialogBox>
//   );
// }

// export default UpdateSubjectDialog;
