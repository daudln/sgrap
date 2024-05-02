"use client";

import DialogBox from "@/components/dialog-box";
import { UserData } from "@/types/user";
import { Dispatch, SetStateAction } from "react";
import UpdateStudentForm from "./update-student-form";

interface Props {
  open: boolean;
  profile: UserData;
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
