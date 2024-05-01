"use client";

import { Profile, User } from "@prisma/client";
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

type ProfileRow = Profile & User;

// function RowActions({ profile }: { profile: ProfileRow }) {
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showEditDialog, setShowEditDialog] = useState(false);

//   return (
//     <>
//       <DeleteSubjectDialog
//         open={showDeleteDialog}
//         setOpen={setShowDeleteDialog}
//         subjectId={subject.uuid}
//       />
//       <UpdateSubjectDialog
//         setOpen={setShowEditDialog}
//         open={showEditDialog}
//         subjectId={subject.uuid}
//       />

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant={"ghost"} className="h-8 w-8 p-0 ">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             className="flex items-center gap-2 text-destructive cursor-pointer"
//             onSelect={() => {
//               setShowDeleteDialog((prev) => !prev);
//             }}
//           >
//             <BsTrash3 className="h-4 w-4" />
//             Delete
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             className="flex items-center gap-2 text-emerald-500 cursor-pointer"
//             onSelect={() => {
//               setShowEditDialog((prev) => !prev);
//             }}
//           >
//             <LuPencil className="h-4 w-4" />
//             Update
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// }

type ProfileArray = ProfileData[];

import AlertNotication from "@/components/alert-notification";
import { DataTable } from "@/components/datatable/datas-table";
import { Badge } from "@/components/ui/badge";
import CreateSubjectDialog from "./create-teacher-dialog";
import useProfiles from "@/hooks/useProfiles";
import useSchools from "@/hooks/useSchools";
import { ProfileData, UserProfile } from "@/types/profile";

const filterFn: FilterFn<ProfileData> = (row, id, value: string[] | string) => {
  const searchableRowContent = `${row.original.profile.user.name} ${row.original.profile.type} ${row.original.profile.phoneNumber} ${row.original.profile.school.name} ${row.original.profile.user.email}`;

  if (Array.isArray(value)) {
    return value.some((v) => row.getValue(id) === v);
  }
  return searchableRowContent.toLowerCase().includes(value.toLowerCase());
};

const getDataForExport = (teacher: ProfileData) => ({
  name: teacher.profile.user.name,
  email: teacher.profile.user.email,
  school: teacher.profile.school.name,
  type: teacher.profile.type,
  phoneNumber: teacher.profile.phoneNumber,
});

const columns: ColumnDef<ProfileData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        <div className="capitalize">{row.original.profile.user.name}</div>
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
        <div className="">{row.original.profile.user.email}</div>
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
        <div className="">{row.original.profile.phoneNumber}</div>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="">{row.original.profile.type}</div>
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
        <div className="">{row.original.profile.school.name}</div>
      </div>
    ),
  },
];

const TeachersTable = () => {
  const { data, isLoading, error } = useProfiles();
  const [open, setOpen] = useState(false);
  const { data: schools } = useSchools();

  const SCHOOLS = [
    {
      label: "Schools",
      key: "school",
      options:
        schools?.data.map((school) => ({
          label: school.name,
          value: school.name,
        })) || [],
    },
  ];

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
        filters={SCHOOLS || []}
        filterPlaceholder="Filter teachers"
        getDataForExport={getDataForExport}
        isLoading={isLoading}
      />
    </>
  );
};

export default TeachersTable;
