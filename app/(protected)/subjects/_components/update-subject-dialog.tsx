"use client";

import { SubjectOutput } from "@/app/(protected)/_procedures/subject";
import UpdateSubjectForm from "@/app/(protected)/subjects/_components/update-subject-form";
import DialogBox from "@/components/dialog-box";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  subject: SubjectOutput;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SUBJECT_CATEGORIES = [
  {
    label: "Art",
    value: "ART",
  },
  {
    label: "Science",
    value: "SCIENCE",
  },
];

function UpdateSubjectDialog({ subject, open, setOpen }: Props) {
  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      title="Update Subject"
      description="Update the subject details"
    >
      <UpdateSubjectForm subject={subject} setOpen={setOpen} />
    </DialogBox>
  );
}

export default UpdateSubjectDialog;
