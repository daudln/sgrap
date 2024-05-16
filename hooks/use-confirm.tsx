import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

import React from "react";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost";

const useConfirm = (
  title: string,
  message: string,
  cancelButtonText?: string,
  confirmButtonText?: string,
  cancelButtonVariant?: Variant,
  confirmButtonVariant?: Variant
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: unknown) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={!!promise} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button
            variant={cancelButtonVariant || "outline"}
            onClick={handleCancel}
          >
            {cancelButtonText || "Cancel"}
          </Button>
          <Button
            onClick={handleConfirm}
            variant={confirmButtonVariant || "default"}
          >
            {confirmButtonText || "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};

export default useConfirm;
