"use client";

import { SchoolRouterOutput } from "@/app/(protected)/_procedures/school";
import UpdateSchoolForm from "@/app/(protected)/schools/_components/update-school-form";
import DialogBox from "@/components/dialog-box";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  school: SchoolRouterOutput;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateSchoolDialog({ school, open, setOpen }: Props) {
  if (!school) {
    return null;
  }
  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      title="Update school"
      description="Update the subject details"
    >
      <UpdateSchoolForm school={school} setOpen={setOpen} />
    </DialogBox>
  );
}

export default UpdateSchoolDialog;
