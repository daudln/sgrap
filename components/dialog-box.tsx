"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  title: string;
  description?: string;
  triger: React.ReactNode;
}

const DialogBox = ({
  children,
  footerContent,
  title,
  description,
  triger,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>{footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
