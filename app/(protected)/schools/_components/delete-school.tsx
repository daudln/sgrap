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
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  schoolId: string;
}

function DeleteSubjectDialog({ open, setOpen, schoolId }: Props) {
  const trpc = useTRPC();
  const deleteSchool = trpc.school.delete.mutationOptions();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteSchool.mutationFn,
    onSuccess: async () => {
      toast.success("School deleted", {
        id: schoolId,
      });

      await queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
    },
    onError: (error) => {
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
              deleteMutation.mutate({ id: schoolId });
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
