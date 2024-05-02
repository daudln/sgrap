"use client";

import DialogBox from "@/components/dialog-box";
import { APIResponse } from "@/services/api.service";
import { School } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import UpdateSchoolForm from "./update-school-form";

interface Props {
  open: boolean;
  schoolId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateSchoolDialog({ schoolId, open, setOpen }: Props) {
  const queryClient = useQueryClient();
  const schools = queryClient.getQueryData<APIResponse<School>>([
    "schools",
  ])?.data;

  const school = schools?.find((school) => school.uuid === schoolId) as
    | School
    | undefined;
  if (!school)
    toast.error("Something went wrong", {
      id: schoolId,
    });

  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      title="Update school"
      description="Update the subject details"
    >
      <UpdateSchoolForm school={school!} setOpen={setOpen} />
    </DialogBox>
  );
}

export default UpdateSchoolDialog;
