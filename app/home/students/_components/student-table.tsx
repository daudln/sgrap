// "use client";

// import useSubjects from "@/hooks/useSubjects";
// import { Subject } from "@prisma/client";
// import { ColumnDef, FilterFn } from "@tanstack/react-table";

// import { useState } from "react";

// import { DataTableColumnHeader } from "@/components/datatable/ColumnHeader";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
// import { BsTrash3 } from "react-icons/bs";
// import { LuPencil } from "react-icons/lu";
// import DeleteStudentDialog from "./delete-subject";

// type SubjectRow = Subject;

// function RowActions({ subject }: { subject: SubjectRow }) {
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showEditDialog, setShowEditDialog] = useState(false);

//   return (
//     <>
//       <DeleteStudentDialog
//         open={showDeleteDialog}
//         setOpen={setShowDeleteDialog}
//         subjectId={subject.uuid}
//       />
//       <UpdateStudentDialog
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

// import { DataTable } from "@/components/datatable/datas-table";
// import CreateStudentDialog from "./create-student-dialog";
// import { filters } from "./filters";
// import UpdateStudentDialog from "./update-student-dialog";

// const filterFn: FilterFn<Subject> = (
//   row,
//   columnId,
//   filterValue: string[] | string
// ) => {
//   const searchableRowContent = `${row.original.name} ${row.original.category} ${row.original.description} ${row.original.code} ${row.original.id}`;

//   if (Array.isArray(filterValue)) {
//     return searchableRowContent
//       .toLowerCase()
//       .includes(filterValue.map((s) => s.toLowerCase()).join(" "));
//   }
//   return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
// };

// const getDataForExport = (subject: Subject) => ({
//   code: subject.code,
//   name: subject.name,
//   description: subject.description,
// });

// const columns: ColumnDef<SubjectRow>[] = [
//   {
//     accessorKey: "code",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Code" />
//     ),
//     filterFn: filterFn,
//     cell: ({ row }) => (
//       <div className="flex gap-2 capitalize">
//         <div className="capitalize">{row.original.code}</div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Name" />
//     ),
//     filterFn: filterFn,
//     cell: ({ row }) => (
//       <div className="flex gap-2 capitalize">
//         <div className="">{row.original.name}</div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "category",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Category" />
//     ),
//     filterFn: filterFn,
//     cell: ({ row }) => (
//       <div className="flex gap-2 capitalize">
//         <div className="">{row.original.category}</div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "description",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Description" />
//     ),
//     cell: ({ row }) => <div className="">{row.original.description}</div>,
//     filterFn: filterFn,
//   },

//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => <RowActions subject={row.original} />,
//   },
// ];

// const SubjectTable = () => {
//   const { data, isLoading, error } = useSubjects();
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div className="flex justify-end mb-4">
//         <CreateStudentDialog open={open} setOpen={setOpen} />
//       </div>

//       <DataTable
//         data={data?.data || []}
//         columns={columns}
//         filters={filters}
//         filterPlaceholder="Filter subjects"
//         getDataForExport={getDataForExport}
//         isLoading={isLoading}
//       />
//     </>
//   );
// };

// export default SubjectTable;
