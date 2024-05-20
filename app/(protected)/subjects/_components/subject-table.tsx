"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { useState } from "react";

import { DataTableColumnHeader } from "@/components/datatable/column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { BsFillExclamationTriangleFill, BsTrash3 } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import DeleteSubjectDialog from "./delete-subject";

import AlertNotication from "@/components/alert-notification";
import { DataTable } from "@/components/datatable/data-table";
import { Badge } from "@/components/ui/badge";
import CreateSubjectDialog from "./create-subject-dialog";
import UpdateSubjectDialog from "./update-subject-dialog";
import { SUBJECT_CATEGORY_FILTER, VARIANTS } from "@/lib/constants";
import ViewData from "@/components/view-data";
import { z } from "zod";
import { createSubjectSchema } from "@/db/schema/subject";
import useGetSubjects from "@/hooks/subject/use-get-subjects";
import useConfirm from "@/hooks/use-confirm";
import { Checkbox } from "@/components/ui/checkbox";
import useBulkDeleteSubject from "@/hooks/subject/use-bulk-delete-subject";
import useDeleteSubject from "@/hooks/subject/use-delete-subject";
import ImportCard from "@/components/import-card";
import useCreateSubjects from "@/hooks/subject/use-create-subjects";
import { useStore } from "@/store/store";

type SubjectRow = z.infer<typeof createSubjectSchema>;

function RowActions({ subject }: { subject: SubjectRow }) {
  const mutation = useDeleteSubject(subject.id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Subject",
    "Are you sure you want to delete this subject?",
    "Cancel",
    "Delete",
    "default",
    "destructive"
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      mutation.mutate();
    }
  };
  return (
    <>
      <ConfirmDialog />
      <DeleteSubjectDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        subjectId={subject.id!}
      />
      <UpdateSubjectDialog
        setOpen={setShowEditDialog}
        open={showEditDialog}
        subjectId={subject.id!}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0 ">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive cursor-pointer"
            onSelect={onDelete}
          >
            <BsTrash3 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 text-emerald-500 cursor-pointer"
            onSelect={() => {
              setShowEditDialog((prev) => !prev);
            }}
          >
            <LuPencil className="h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-emerald-500 cursor-pointer">
            <ViewData link={`/subjects/${subject.id}`} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const filterFn: FilterFn<SubjectRow> = (row, id, value: string[] | string) => {
  const searchableRowContent = `${row.original.name} ${row.original.category} ${row.original.description} ${row.original.code}`;

  if (Array.isArray(value)) {
    return value.some((v) => row.getValue(id) === v);
  }
  return searchableRowContent.toLowerCase().includes(value.toLowerCase());
};

const getDataForExport = (subject: SubjectRow) => ({
  code: subject.code,
  name: subject.name,
  category: subject.category,
  description: subject.description,
});

const columns: ColumnDef<SubjectRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="rounded-sm"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    filterFn: filterFn,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        <div className="capitalize">{row.original.code}</div>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        <div className="">{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        <Badge
          className={
            row.original.category === "SCIENCE"
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 text-white"
          }
        >
          {row.original.category}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div className="">{row.original.description}</div>,
    filterFn: filterFn,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions subject={row.original} />,
  },
];

const SubjectTable = () => {
  const { data, isLoading, error } = useGetSubjects();
  const deleteSubjects = useBulkDeleteSubject();
  const createSubjects = useCreateSubjects();
  const [open, setOpen] = useState(false);
  const isDisabled =
    isLoading || deleteSubjects.isPending || createSubjects.isPending;

  const variant = useStore((s) => s.variant);
  const importResults = useStore((s) => s.importResults);
  const onCancelImport = useStore((s) => s.onCancelImport);

  type subjectValues = Omit<z.infer<typeof createSubjectSchema>, "id">;

  const onSubmitImport = (values: subjectValues[]) => {
    createSubjects.mutate(values);
  };

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard data={importResults.data} onSubmit={onSubmitImport} />
      </>
    );
  }

  if (error)
    return (
      <AlertNotication
        title={"Error"}
        description={error.message}
        className="my-12"
        variant="destructive"
        alertIcon={<BsFillExclamationTriangleFill className="h-4 w-4" />}
      />
    );
  return (
    <>
      <div className="flex justify-end mb-4">
        <CreateSubjectDialog open={open} setOpen={setOpen} />
      </div>

      <DataTable
        data={data?.data || []}
        columns={columns}
        filters={SUBJECT_CATEGORY_FILTER}
        filterPlaceholder="Filter subjects..."
        getDataForExport={getDataForExport}
        isLoading={isLoading}
        hasColumnSelection={true}
        hasUploadButton={true}
        disabled={isDisabled}
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          deleteSubjects.mutate({ ids });
        }}
      />
    </>
  );
};

export default SubjectTable;
