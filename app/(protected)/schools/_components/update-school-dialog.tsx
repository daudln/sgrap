"use client";

import DialogBox from "@/components/dialog-box";
import { CreateSchoolInput } from "@/schema/school";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import UpdateSchoolForm from "./update-school-form";

interface Props {
  open: boolean;
  schoolId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export type School = CreateSchoolInput & {
  id: string;
};
function UpdateSchoolDialog({ schoolId, open, setOpen }: Props) {
  const queryClient = useQueryClient();
  const schools = queryClient.getQueryData<School[]>(["schools"]);

  const school = schools?.find((school) => school.id === schoolId) as
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
