"use client";

import DialogBox from "@/components/dialog-box";
import { Dispatch, SetStateAction } from "react";
import UpdateStudentForm from "./update-student-form";
import { StudentData } from "@/types/user";

interface Props {
  open: boolean;
  profile: StudentData;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateStudentDialog({ profile, open, setOpen }: Props) {
  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      title="Update Student"
      description="Update the student details"
    >
      <UpdateStudentForm profile={profile} setOpen={setOpen} />
    </DialogBox>
  );
}

export default UpdateStudentDialog;
