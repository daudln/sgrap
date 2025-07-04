import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Dispatch, SetStateAction } from "react";
import CreateStudentForm from "./create-student-form";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSubjectDialog = ({ open, setOpen }: Props) => {
  return (
    <ResponsiveDialog
      title="Create Student"
      description="Fill the form below to create a new student"
    >
      <CreateStudentForm />
    </ResponsiveDialog>
  );
};

export default CreateSubjectDialog;
