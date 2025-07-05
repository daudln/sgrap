"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { useState } from "react";

import DeleteSubjectDialog from "@/app/(protected)/subjects/_components/delete-subject";
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

import { SubjectOutput } from "@/app/(protected)/_procedures/subject";
import CreateSubjectDialog from "@/app/(protected)/subjects/_components/create-subject-dialog";
import UpdateSubjectDialog from "@/app/(protected)/subjects/_components/update-subject-dialog";
import AlertNotication from "@/components/alert-notification";
import { DataTable } from "@/components/datatable/data-table";
import ImportCard from "@/components/import/import-card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import ViewData from "@/components/view-data";
import { createSubjectSchema } from "@/db/schema/subject";
import useConfirm from "@/hooks/use-confirm";
import { SUBJECT_CATEGORY_FILTER, VARIANTS } from "@/lib/constants";
import { useStore } from "@/store/store";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

function RowActions({ subject }: { subject: SubjectOutput }) {
  // const mutation = useDeleteSubject(subject.id);
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
      // mutation.mutate();
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
        subject={subject}
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

const filterFn: FilterFn<SubjectOutput> = (
  row,
  id,
  value: string[] | string
) => {
  const searchableRowContent = `${row.original.name} ${row.original.category}`;

  if (Array.isArray(value)) {
    return value.some((v) => row.getValue(id) === v);
  }
  return searchableRowContent.toLowerCase().includes(value.toLowerCase());
};

const getDataForExport = (subject: SubjectOutput) => ({
  name: subject.name,
  category: subject.category,
});

const columns: ColumnDef<SubjectOutput>[] = [
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions subject={row.original} />,
  },
];

const SubjectTable = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useSuspenseQuery(
    trpc.subject.getAll.queryOptions()
  );

  const createSubjects = trpc.subject.bulkCreate.mutationOptions();
  const deleteSubjects = trpc.subject.deleteMany.mutationOptions();

  const createSubjectsMutation = useMutation({
    mutationFn: createSubjects.mutationFn,
    onSuccess: async () => {
      toast.success("Subject updated successfully", {
        id: "create-subject",
      });
      queryClient.invalidateQueries({
        queryKey: trpc.subject.getAll.queryKey(),
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-subject",
      });
    },
  });

  const deleteSubjectsMutation = useMutation({
    mutationFn: deleteSubjects.mutationFn,
    onSuccess: async () => {
      toast.success("Subjects deleted successfully", {
        id: "create-subject",
      });
      queryClient.invalidateQueries({
        queryKey: trpc.subject.getAll.queryKey(),
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-subject",
      });
    },
  });

  const [open, setOpen] = useState(false);
  const isDisabled =
    isLoading ||
    deleteSubjectsMutation.isPending ||
    createSubjectsMutation.isPending;

  const variant = useStore((s) => s.variant);
  const importResults = useStore((s) => s.importResults);
  const onCancelImport = useStore((s) => s.onCancelImport);

  type subjectValues = Omit<z.infer<typeof createSubjectSchema>, "id">;

  const onSubmitImport = (values: subjectValues[]) => {
    createSubjectsMutation.mutate(values);
  };

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard
          data={importResults.data}
          onSubmit={onSubmitImport}
          columns={["name", "category"]}
          requiredColumns={["name", "category"]}
          // open={variant === VARIANTS.IMPORT}
          onCancelImport={onCancelImport}
        />
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
        data={data}
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
          deleteSubjectsMutation.mutate({ ids });
        }}
      />
    </>
  );
};

export default SubjectTable;
