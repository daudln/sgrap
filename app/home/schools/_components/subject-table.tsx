"use client";

import useSchools from "@/hooks/useSchools";
import { School } from "@prisma/client";
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
import { BsTrash3 } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import DeleteSchoolDialog from "./delete-school";

type SchoolRow = School;

function RowActions({ school }: { school: SchoolRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DeleteSchoolDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        schoolId={school.uuid}
      />
      <UpdatesShoolDialog
        setOpen={setShowEditDialog}
        open={showEditDialog}
        schoolId={school.uuid}
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

import { DataTable } from "@/components/datatable/datas-table";
import CreateschoolDialog from "./create-school-dialog";
import UpdatesShoolDialog from "./update-school-dialog";

const filterFn: FilterFn<School> = (
  row,
  columnId,
  filterValue: string[] | string
) => {
  const searchableRowContent = `${row.original.name} ${row.original.motto} ${row.original.id}`;

  if (Array.isArray(filterValue)) {
    return searchableRowContent
      .toLowerCase()
      .includes(filterValue.map((s) => s.toLowerCase()).join(" "));
  }
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

const getDataForExport = (school: School) => ({
  name: school.name,
  motto: school.motto,
});

const columns: ColumnDef<SchoolRow>[] = [
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
    accessorKey: "motto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Motto" />
    ),
    filterFn: filterFn,
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        <div className="">{row.original.motto}</div>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions school={row.original} />,
  },
];

const SchoolTable = () => {
  const { data, isLoading, error } = useSchools();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-4">
        <CreateschoolDialog open={open} setOpen={setOpen} />
      </div>

      <DataTable
        data={data?.data || []}
        columns={columns}
        filterPlaceholder="Filter schools"
        getDataForExport={getDataForExport}
        isLoading={isLoading}
      />
    </>
  );
};

export default SchoolTable;
