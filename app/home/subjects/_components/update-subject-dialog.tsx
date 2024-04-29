"use client";

import { APIResponse } from "@/services/api.service";
import { Subject } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import UpdateSubjectForm from "./update-subject-form";
import DialogBox from "@/components/dialog-box";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  subjectId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateSubjectDialog({ subjectId, open, setOpen }: Props) {
  const queryClient = useQueryClient();
  const subjects = queryClient.getQueryData<APIResponse<Subject>>([
    "subjects",
  ])?.data;
  const subject = subjects?.find((subject) => subject.uuid === subjectId) as
    | Subject
    | undefined;
  if (!subject)
    toast.error("Something went wrong", {
      id: subjectId,
    });

  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      title="Update Subject"
      description="Update the subject details"
    >
      <UpdateSubjectForm subject={subject!} />
    </DialogBox>
  );
}

export default UpdateSubjectDialog;
