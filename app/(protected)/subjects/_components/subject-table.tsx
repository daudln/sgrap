"use client";

import useSubjects from "@/hooks/useSubjects";
import { Subject } from "@prisma/client";
import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { useState } from "react";

import { DataTableColumnHeader } from "@/components/datatable/ColumnHeader";
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
import { DataTable } from "@/components/datatable/datas-table";
import { Badge } from "@/components/ui/badge";
import CreateSubjectDialog from "./create-subject-dialog";
import UpdateSubjectDialog from "./update-subject-dialog";
import { SUBJECT_CATEGORY_FILTER } from "@/lib/constants";

type SubjectRow = Subject;

function RowActions({ subject }: { subject: SubjectRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DeleteSubjectDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        subjectId={subject.uuid}
      />
      <UpdateSubjectDialog
        setOpen={setShowEditDialog}
        open={showEditDialog}
        subjectId={subject.uuid}
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
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const filterFn: FilterFn<Subject> = (row, id, value: string[] | string) => {
  const searchableRowContent = `${row.original.name} ${row.original.category} ${row.original.description} ${row.original.code}`;

  if (Array.isArray(value)) {
    console.log(value);
    return value.some((v) => row.getValue(id) === v);
  }
  return searchableRowContent.toLowerCase().includes(value.toLowerCase());
};

const getDataForExport = (subject: Subject) => ({
  code: subject.code,
  name: subject.name,
  category: subject.category,
  description: subject.description,
});

const columns: ColumnDef<SubjectRow>[] = [
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
  const { data, isLoading, error } = useSubjects();
  const [open, setOpen] = useState(false);
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
        filterPlaceholder="Filter subjects"
        getDataForExport={getDataForExport}
        isLoading={isLoading}
      />
    </>
  );
};

export default SubjectTable;
