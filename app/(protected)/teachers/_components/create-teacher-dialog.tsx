import DialogBox from "@/components/dialog-box";
import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";
import { PiPlus } from "react-icons/pi";
import CreateTeacherForm from "./create-teacher-form";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSubjectDialog = ({ open, setOpen }: Props) => {
  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      triger={
        <Button variant="outline" size="sm">
          <PiPlus className="mr-2" /> Teacher
        </Button>
      }
      title="Create Teacher"
      description="Fill the form below to create a new teacher"
    >
      <CreateTeacherForm setOpen={setOpen} />
    </DialogBox>
  );
};

export default CreateSubjectDialog;
