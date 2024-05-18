"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { useState } from "react";

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
import { StudentData } from "@/types/user";
import { MoreHorizontal } from "lucide-react";
import { BsTrash3 } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import CreateStudentDialog from "./create-student-dialog";
import DeleteStudentDialog from "./delete-student";
import UpdateStudentDialog from "./update-student-dialog";
import { formatClassName } from "@/lib/helpers";
import {
  CLASS_FILTER,
  GENDER_FILTER,
  INITIAL_IMPORT_RESULTS,
  VARIANTS,
} from "@/lib/constants";
import useGetStudents from "@/hooks/student/use-get-students";

function RowActions({ profile }: { profile: StudentData }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DeleteStudentDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        id={profile.user.id}
      />
      <UpdateStudentDialog
        setOpen={setShowEditDialog}
        open={showEditDialog}
        profile={profile}
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

const filterFn: FilterFn<StudentData> = (row, id, value: string[] | string) => {
  const searchableRowContent = `${row.original.user.email} ${row.original.school.motto} ${row.original.school.name} ${row.original.profile.gender} ${row.original.student.classLevel}`;

  if (Array.isArray(value)) {
    return value.some((v) => row.getValue(id) === v);
  }
  return searchableRowContent.toLowerCase().includes(value.toLowerCase());
};

const getDataForExport = (student: StudentData) => ({
  name: student.user.name,
  email: student.user.email,
  school: student.school.name,
  gender: student.profile.gender,
  class: student.student.classLevel,
});

const columns: ColumnDef<StudentData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        <div className="capitalize">{row.original.user.name}</div>
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
        <div className="">{row.original.user.email}</div>
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
        <div className="">{row.original.profile.gender || "-"}</div>
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
        <div className="">{row.original.profile?.phoneNumber || "-"}</div>
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
          {formatClassName(row.original.student.classLevel || "-")}
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
    cell: ({ row }) => <RowActions profile={row.original} />,
  },
];

const StudentTable = () => {
  const { data, isLoading, error } = useGetStudents();
  const [open, setOpen] = useState(false);
  const filters = [GENDER_FILTER, CLASS_FILTER];
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <CreateStudentDialog open={open} setOpen={setOpen} />
      </div>

      <DataTable
        data={data || []}
        columns={columns}
        filters={filters}
        filterPlaceholder="Filter students..."
        getDataForExport={getDataForExport}
        isLoading={isLoading}
      />
    </>
  );
};

export default StudentTable;
