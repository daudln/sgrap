"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteStudent } from "../_actions/actions";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

function DeleteSubjectDialog({ open, setOpen, id }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: id,
      });

      await queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: id,
      });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            student
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={() => {
              toast.loading("Deleting subject...", {
                id: id,
              });
              deleteMutation.mutate({ uuid: id });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteSubjectDialog;
