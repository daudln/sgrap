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

import AlertNotication from "@/components/alert-notification";
import { DataTable } from "@/components/datatable/data-table";
import useTeachers from "@/hooks/useTeachers";
import { UserData } from "@/types/user";
import CreateSubjectDialog from "./create-teacher-dialog";
import DeleteTeacherDialog from "./delete-teacher";
import UpdateTeacherDialog from "./update-teacher-dialog";
import { useSchoolFilter } from "@/hooks/useSchools";
import { GENDER_FILTER } from "@/lib/constants";

function RowActions({ profile }: { profile: UserData }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DeleteTeacherDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        teacherId={profile.id}
      />
      <UpdateTeacherDialog
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
  const searchableRowContent = `${row.original.name} ${row.original.Profile.phoneNumber} ${row.original.Profile.school.name} ${row.original.email} ${row.original.Profile.school.uuid} ${row.original.Profile.gender}`;

  if (Array.isArray(value)) {
    return value.some((v) => row.getValue(id) === v);
  }
  return searchableRowContent.toLowerCase().includes(value.toLowerCase());
};

const getDataForExport = (teacher: UserData) => ({
  name: teacher.name,
  email: teacher.email,
  school: teacher.Profile.school.name,
  phoneNumber: teacher.Profile.phoneNumber,
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
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">{row.original.email}</div>
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
        <div className="">{row.original.Profile.gender}</div>
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
        <div className="">{row.original.Profile.phoneNumber}</div>
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
        <div className="">{row.original.Profile.school.name}</div>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions profile={row.original} />,
  },
];

const TeachersTable = () => {
  const { data, isLoading, error } = useTeachers();
  const [open, setOpen] = useState(false);

  const filters = [useSchoolFilter(), GENDER_FILTER];

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
        filters={filters}
        filterPlaceholder="Filter teachers..."
        getDataForExport={getDataForExport}
        isLoading={isLoading}
      />
    </>
  );
};

export default TeachersTable;
