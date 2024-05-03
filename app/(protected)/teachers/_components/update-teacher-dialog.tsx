"use client";

import DialogBox from "@/components/dialog-box";
import { UserData } from "@/types/user";
import { Dispatch, SetStateAction } from "react";
import UpdateTeacherForm from "./update-teacher-form";

interface Props {
  open: boolean;
  profile: UserData;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateTeacherDialog({ profile, open, setOpen }: Props) {
  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      title="Update teacher"
      description="Update the teacher details"
    >
      <UpdateTeacherForm profile={profile} setOpen={setOpen} />
    </DialogBox>
  );
}

export default UpdateTeacherDialog;
