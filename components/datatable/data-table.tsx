import { ReactNode, useMemo, useState } from "react";
import {
  useReactTable,
  SortingState,
  ColumnFiltersState,
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { DownloadIcon, MoreHorizontal } from "lucide-react";
import { BsTrash3 } from "react-icons/bs";
import DataTableSkeleton from "./data-table-skeleton";
import { DataTableFacetedFilter } from "./FacetedFilters";

const emptyData: any[] = [];

interface RowActionsProps<T> {
  item: T;
}

interface DataTableAction<T> {
  label: string;
  icon?: React.ComponentType; // For optional icons
  onSelect: (row: T) => void;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getDataForExport: (item: T) => any;
  rowAction?: DataTableAction<T>[];
  facetedFilters?: ReactNode[];
  isLoading?: boolean;
  hasActionColumn?: boolean;
  actionDialog?: React.ComponentType<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    subjectId: string;
  }>;
  facetedFiltersOptions?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const DataTable = <T,>({
  data,
  columns,
  getDataForExport,
  facetedFilters,
  rowAction,
  isLoading = false,
  facetedFiltersOptions,
  hasActionColumn,
  actionDialog,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleExportCSV = (data: any[]) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useReactTable({
    data: data || emptyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const actionColumn = useMemo(
    () => ({
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: (typeof columns)[0] }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* ... Your button */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* ... Your menu items */}
            {rowAction?.map((action) => (
              <DropdownMenuItem
                key={action.label}
                // ...
                onSelect={() => {
                  // action.onSelect(row);
                }}
              >
                {/* ... */}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
    [rowAction]
  );

  return (
    <div className="w-full">
      <Input
        placeholder="Search..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm mt-4"
      />
      <div className="flex flex-wrap items-end justify-between gap-2 py-4">
        <div className="flex gap-2">
          {facetedFiltersOptions && (
            <DataTableFacetedFilter
              title="Name"
              column={table.getColumn("code")}
              options={facetedFiltersOptions}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            className="ml-auto h-8 lg:flex"
            onClick={() => {
              const data = table
                .getFilteredRowModel()
                .rows.map((row) => getDataForExport(row.original));
              handleExportCSV(data);
            }}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <DataTableSkeleton isLoading={isLoading}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DataTableSkeleton>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const RowActions = <T,>({ item }: RowActionsProps<T>) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
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
            className="flex items-center gap-2  text-destructive cursor-pointer"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <BsTrash3 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DataTable;
