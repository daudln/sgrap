"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { RxMixerHorizontal } from "react-icons/rx";
import { Row, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DownloadIcon, Trash } from "lucide-react";
import { download, generateCsv, mkConfig } from "export-to-csv";
import useConfirm from "@/hooks/use-confirm";
import UploadButton from "../upload-button";
import { useStore } from "@/store/store";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  getDataForExport?: (item: TData) => any;
  onDelete?: (rows: Row<TData>[]) => void;
  hasUploadButton?: boolean;
}

export function DataTableViewOptions<TData>({
  table,
  getDataForExport,
  onDelete,
  hasUploadButton = false,
}: DataTableViewOptionsProps<TData>) {
  const handleExportCSV = (data: any[]) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const [ConfirmDialog, confirm] = useConfirm(
    "Bulk Delete",
    "Are you sure you want to delete these items?",
    "Cancel",
    "Delete",
    "default",
    "destructive"
  );

  const onUpload = useStore((s) => s.onUpload);

  return (
    <>
      <ConfirmDialog />
      <div className="flex gap-4">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            size="sm"
            variant="outline"
            className="h-8"
            onClick={async () => {
              const ok = await confirm();
              if (ok) {
                onDelete && onDelete(table.getFilteredSelectedRowModel().rows);
                table.resetRowSelection();
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex text-sm"
            >
              <RxMixerHorizontal className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {hasUploadButton && onUpload && <UploadButton onUpload={onUpload} />}
        {getDataForExport && (
          <Button
            variant={"outline"}
            size={"sm"}
            className="ml-auto h-8 lg:flex"
            onClick={() => {
              const data = table
                .getFilteredRowModel()
                .rows.map((row) => getDataForExport(row.original));
              handleExportCSV(data);
            }}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        )}
      </div>
    </>
  );
}
