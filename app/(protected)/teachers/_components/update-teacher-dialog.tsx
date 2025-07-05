"use client";

import { Dispatch, SetStateAction } from "react";
import { TeacherData } from "@/types/user";

interface Props {
  open: boolean;
  profile: TeacherData;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateTeacherDialog({ profile, open, setOpen }: Props) {
  return (
    <h1>hhh</h1>
    // <DialogBox
    //   open={open}
    //   onOpenChange={setOpen}
    //   title="Update teacher"
    //   description="Update the teacher details"
    // >
    //   <UpdateTeacherForm profile={profile} setOpen={setOpen} />
    // </DialogBox>
  );
}

export default UpdateTeacherDialog;
