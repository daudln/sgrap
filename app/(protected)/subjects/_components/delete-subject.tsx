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
import { deleteSubject } from "../_actions/actions";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  subjectId: string;
}

function DeleteSubjectDialog({ open, setOpen, subjectId }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteSubject,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: subjectId,
      });

      await queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: subjectId,
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
            subject
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={() => {
              toast.loading("Deleting subject...", {
                id: subjectId,
              });
              deleteMutation.mutate({ id: subjectId });
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
