import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TableHeadSelect from "@/components/table-head-select";

type Props = {
  headers: string[];
  columns: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectChange: (index: number, value: string | null) => void;
  onRemoveRow: (index: number) => void;
};

const ImportTable = ({
  headers,
  columns,
  body,
  selectedColumns,
  onTableHeadSelectChange,
  onRemoveRow,
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
            <TableHead className="px-4 py-2 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {body.map((row: string[], rowIndex) => (
              <motion.tr
                key={rowIndex}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-muted/50"
              >
                {row.map((cell: string, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveRow(rowIndex)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};

export default ImportTable;
