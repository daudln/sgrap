"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { useState } from "react";

import { DataTableColumnHeader } from "@/components/datatable/ColumnHeader";
import { DataTable } from "@/components/datatable/datas-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStudents from "@/hooks/useStudents";
import { UserData } from "@/types/user";
import { MoreHorizontal } from "lucide-react";
import { BsTrash3 } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import CreateStudentDialog from "./create-student-dialog";
import DeleteStudentDialog from "./delete-student";
import UpdateStudentDialog from "./update-student-dialog";
import { useSchoolFilter } from "@/hooks/useSchools";
import { formatClassName } from "@/lib/helpers";
import { CLASS_FILTER, GENDER_FILTER } from "@/lib/constants";

function RowActions({ profile }: { profile: UserData }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DeleteStudentDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        id={profile.id}
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

const filterFn: FilterFn<UserData> = (row, id, value: string[] | string) => {
  const searchableRowContent = `${row.original.name} ${row.original.Profile.school.name} ${row.original.Profile.gender} ${row.original.Profile.Student?.classLevel}`;

  if (Array.isArray(value)) {
    return value.some((v) => row.getValue(id) === v);
  }
  return searchableRowContent.toLowerCase().includes(value.toLowerCase());
};

const getDataForExport = (student: UserData) => ({
  name: student.name,
  email: student.email,
  school: student.Profile.school.name,
  phoneNumber: student.Profile.phoneNumber,
  gender: student.Profile.gender,
  class: student.Profile.Student?.classLevel,
});

const columns: ColumnDef<UserData>[] = [
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
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  //   filterFn: filterFn,
  //   cell: ({ row }) => (
  //     <div className="flex gap-2">
  //       <div className="">{row.original.email}</div>
  //     </div>
  //   ),
  // },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">{row.original.Profile.gender || "-"}</div>
      </div>
    ),
  },
  // {
  //   accessorKey: "phone",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Phone" />
  //   ),
  //   filterFn: filterFn,
  //   cell: ({ row }) => (
  //     <div className="flex gap-2">
  //       <div className="">{row.original.Profile?.phoneNumber || "-"}</div>
  //     </div>
  //   ),
  // },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">
          {formatClassName(row.original.Profile?.Student?.classLevel || "-")}
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
        <div className="">{row.original.Profile?.school?.name || "-"}</div>
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
  const { data, isLoading, error } = useStudents();
  const [open, setOpen] = useState(false);
  const filters = [useSchoolFilter(), GENDER_FILTER, CLASS_FILTER];
  return (
    <>
      <div className="flex justify-end mb-4">
        <CreateStudentDialog open={open} setOpen={setOpen} />
      </div>

      <DataTable
        data={data?.data || []}
        columns={columns}
        filters={filters}
        filterPlaceholder="Filter students..."
        getDataForExport={getDataForExport}
      />
    </>
  );
};

export default StudentTable;
