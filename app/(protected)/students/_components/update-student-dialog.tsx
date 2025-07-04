"use client";

import DialogBox from "@/components/dialog-box";
import { Dispatch, SetStateAction } from "react";
import UpdateStudentForm from "./update-student-form";
import { StudentOutput } from "@/app/(protected)/_procedures/student";

interface Props {
  open: boolean;
  student: StudentOutput;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateStudentDialog({ student, open, setOpen }: Props) {
  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      title="Update Student"
      description="Update the student details"
    >
      <UpdateStudentForm student={student} setOpen={setOpen} />
    </DialogBox>
  );
}

export default UpdateStudentDialog;
