import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImportCard from "./import-card"; // Assuming ImportCard is in the same directory

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: string[][];
  onSubmit: (data: any[]) => void;
  columns: string[];
  requiredColumns: string[];
};

const ImportModal = ({
  isOpen,
  onClose,
  data,
  onSubmit,
  columns,
  requiredColumns,
}: Props) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Import Data</DialogTitle>
        </DialogHeader>
        <ImportCard
          data={data}
          onSubmit={onSubmit}
          columns={columns}
          requiredColumns={requiredColumns}
          onCancelImport={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImportModal;