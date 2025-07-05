import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableHeadSelect from "@/components/table-head-select";

type Props = {
  headers: string[];
  columns: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectChange: (index: number, value: string | null) => void;
};

const ImportTable = ({
  headers,
  columns,
  body,
  selectedColumns,
  onTableHeadSelectChange,
}: Props) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_item, index) => (
              <TableHead key={index} className="px-4 py-2">
                <TableHeadSelect
                  columnIndex={index}
                  columns={columns}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], index) => (
            <TableRow key={index}>
              {row.map((cell: string, index) => {
                return <TableCell key={index}>{cell}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImportTable;
