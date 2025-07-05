import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

type Props = {
  columnIndex: number;
  columns: string[];
  selectedColumns: Record<string, string | null>;
  onChange: (index: number, value: string | null) => void;
};

const TableHeadSelect = ({
  columnIndex,
  columns,
  selectedColumns,
  onChange,
}: Props) => {
  const currentSelected = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelected || ""}
      onValueChange={(value) =>
        onChange(columnIndex, value === "skip" ? null : value)
      }
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize w-full justify-start font-bold",
          currentSelected && "text-blue-500"
        )}
      >
        <SelectValue placeholder="Skip Column" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip" className="capitalize">
          Skip Column
        </SelectItem>
        {columns.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            currentSelected !== option;
          return (
            <SelectItem
              key={index}
              value={option}
              disabled={disabled}
              className="capitalize"
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TableHeadSelect;
