import DialogBox from "@/components/dialog-box";
import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";
import { PiPlus } from "react-icons/pi";
import CreateSchoolForm from "@/app/(protected)/schools/_components/create-school-form";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSchoolDialog = ({ open, setOpen }: Props) => {
  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      triger={
        <Button variant="outline" size="sm">
          <PiPlus className="mr-2" /> School
        </Button>
      }
      title="Create School"
      description="Fill the form below to create a new school"
    >
      <CreateSchoolForm setOpen={setOpen} />
    </DialogBox>
  );
};

export default CreateSchoolDialog;
