"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { useState } from "react";

import CreateStudentDialog from "@/app/(protected)/students/_components/create-student-dialog";
import DeleteStudentDialog from "@/app/(protected)/students/_components/delete-student";
import UpdateStudentDialog from "@/app/(protected)/students/_components/update-student-dialog";
import { DataTableColumnHeader } from "@/components/datatable/column-header";
import { DataTable } from "@/components/datatable/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CLASS_FILTER, GENDER_FILTER } from "@/lib/constants";
import { formatClassName } from "@/lib/helpers";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { BsTrash3 } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { StudentOutput } from "@/app/(protected)/_procedures/student";

function RowActions({ student }: { student: StudentOutput }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DeleteStudentDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        id={student.id}
      />
      <UpdateStudentDialog
        setOpen={setShowEditDialog}
        open={showEditDialog}
        student={student}
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

const filterFn: FilterFn<StudentOutput> = (row, id, value: string[] | string) => {
  const searchableRowContent = `${row.original.email} ${row.original.school} ${row.original.gender} ${row.original.classLevel}`;

  if (Array.isArray(value)) {
    return value.some((v) => row.getValue(id) === v);
  }
  return searchableRowContent.toLowerCase().includes(value.toLowerCase());
};

const getDataForExport = (student: StudentOutput) => ({
  name: student.name,
  email: student.email,
  school: student.school,
  gender: student.gender,
  class: student.classLevel,
});

const columns: ColumnDef<StudentOutput>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        <div className="capitalize">{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">{row.original.email || "-"}</div>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">{row.original.gender || "-"}</div>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">{row.original.phoneNumber || "-"}</div>
      </div>
    ),
  },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">
          {formatClassName(row.original.classLevel || "-")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "school",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="School" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">{row.original.school.name || "-"}</div>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions student={row.original} />,
    filterFn: filterFn,
  },
];

const StudentTable = () => {
  const [open, setOpen] = useState(false);
  const filters = [GENDER_FILTER, CLASS_FILTER];

  const trpc = useTRPC();
  const { data, isLoading } = useSuspenseQuery(
    trpc.student.getPaginated.queryOptions({})
  );

  return (
    <>
      <div className="flex justify-end mb-4">
        <CreateStudentDialog open={open} setOpen={setOpen} />
      </div>

      <DataTable
        data={data.data}
        columns={columns}
        filters={filters}
        filterPlaceholder="Filter students..."
        getDataForExport={getDataForExport}
        isLoading={isLoading}
        onDelete={() => {}}
        hasUploadButton
        hasColumnSelection
      />
    </>
  );
};

export default StudentTable;
