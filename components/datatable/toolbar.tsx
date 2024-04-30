"use client";

import { RxCross2 } from "react-icons/rx";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/datatable/view-option";

import { DataTableFacetedFilter } from "../datatable/faceted-filter";

export interface FilterProps {
  label: string;
  key: string;
  options: { label: string; value: string }[];
  icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableToolbarProps<TData> {
  placeholder?: string;
  table: Table<TData>;
  filters?: FilterProps[];
  searchColumn?: string;
  getDataForExport?: (item: TData) => any;
}

export function DataTableToolbar<TData>({
  table,
  filters,
  placeholder,
  getDataForExport,
  searchColumn,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const column = table.getVisibleLeafColumns().map((column) => column.id)[0];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder || "Filter..."}
          value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(column)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filters &&
          filters.map((filter) => (
            <DataTableFacetedFilter
              key={filter.key}
              column={table.getColumn(filter.key)}
              title={filter.label}
              options={filter.options}
            />
          ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RxCross2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} getDataForExport={getDataForExport} />
    </div>
  );
}
