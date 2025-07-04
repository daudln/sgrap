"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";

import { SchoolRouterOutput } from "@/app/(protected)/_procedures/school";
import { DataTableColumnHeader } from "@/components/datatable/column-header";
import { DataTable } from "@/components/datatable/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ViewData from "@/components/view-data";
import { useTRPC } from "@/trpc/client";
import CreateschoolDialog from "./create-school-dialog";
import DeleteSchoolDialog from "./delete-school";
import UpdatesShoolDialog from "./update-school-dialog";

function RowActions({ school }: { school: SchoolRouterOutput }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DeleteSchoolDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        schoolId={school.id}
      />
      <UpdatesShoolDialog
        setOpen={setShowEditDialog}
        open={showEditDialog}
        school={school}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive cursor-pointer"
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
          >
            <BsTrash3 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 text-emerald-500 cursor-pointer"
            onSelect={() => setShowEditDialog((prev) => !prev)}
          >
            <LuPencil className="h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem className="text-blue-600 cursor-pointer">
            <ViewData link={`/schools/${school.id}`} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const filterFn: FilterFn<SchoolRouterOutput> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.name}`;
  if (Array.isArray(filterValue)) {
    return searchableRowContent
      .toLowerCase()
      .includes(filterValue.join(" ").toLowerCase());
  }
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

const getDataForExport = (school: SchoolRouterOutput) => ({
  name: school.name,
  level: school.level,
  registrationNumber: school.registrationNumber,
  email: school.email,
  phone: school.phone,
  website: school.website,
});

const getSchoolLevelBadge = (level: SchoolRouterOutput["level"]) => {
  switch (level) {
    case "PRIMARY":
      return "info";
    case "SECONDARY":
      return "secondary";
    case "NURSERY":
      return "success";
    case "PRE_PRIMARY":
      return "warning";
    default:
      return "default";
  }
};

const getSchoolTypeBadge = (type: SchoolRouterOutput["type"]) => {
  switch (type) {
    case "GOVERNMENT":
      return "success";
    case "PRIVATE":
      return "warning";
    default:
      return "default";
  }
};

const columns: ColumnDef<SchoolRouterOutput>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <span className="capitalize font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <Badge variant={getSchoolTypeBadge(row.original.type)}>
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ row }) => (
      <Badge variant={getSchoolLevelBadge(row.original.level)}>
        {row.original.level}
      </Badge>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => <span>{row.original.region?.name}</span>,
  },
  {
    accessorKey: "district",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="District" />
    ),
    cell: ({ row }) => <span>{row.original.district?.name}</span>,
  },
  {
    accessorKey: "ward",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ward" />
    ),
    cell: ({ row }) => <span>{row.original.ward?.name}</span>,
  },
  {
    accessorKey: "street",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Street" />
    ),
    cell: ({ row }) => <span>{row.original.street?.name}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions school={row.original} />,
  },
];

const SchoolTable = () => {
  const trpc = useTRPC();
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useSuspenseQuery(
    trpc.school.getAll.queryOptions({ pageSize: 100 })
  );

  return (
    <>
      <div className="flex justify-end mb-4">
        <CreateschoolDialog open={open} setOpen={setOpen} />
      </div>

      <DataTable
        data={data.schools}
        columns={columns}
        filterPlaceholder="Filter schools"
        getDataForExport={getDataForExport}
        hasUploadButton
        isLoading={isLoading}
      />
    </>
  );
};

export default SchoolTable;
