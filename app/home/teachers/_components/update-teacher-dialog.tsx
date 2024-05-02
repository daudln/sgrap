"use client";

import DialogBox from "@/components/dialog-box";
import { APIResponse } from "@/services/api.service";
import { UserProfile } from "@/types/profile";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import UpdateTeacherForm from "./update-teacher-form";
import { UserData } from "@/types/user";

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
