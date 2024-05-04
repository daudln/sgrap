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
import { deleteSchool } from "../_actions/actions";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  schoolId: string;
}

function DeleteSubjectDialog({ open, setOpen, schoolId }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteSchool,
    onSuccess: async ({ data }) => {
      if (!data?.success) {
        toast.error(data?.message, {
          id: schoolId,
        });
      } else {
        toast.success(data?.message, {
          id: schoolId,
        });
      }

      await queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: schoolId,
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
            school
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={() => {
              toast.loading("Deleting subject...", {
                id: schoolId,
              });
              deleteMutation.mutate({ uuid: schoolId });
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
