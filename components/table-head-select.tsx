const OPTIONS = ["code", "name", "category", "description"] as const;
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
  selectedColumns: Record<string, string | null>;
  onChange: (index: number, value: string | null) => void;
};
const TableHeadSelect = ({ columnIndex, selectedColumns, onChange }: Props) => {
  const currentSelected = selectedColumns[`column_${columnIndex}`];
  return (
    <Select
      value={currentSelected || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
          currentSelected && "text-blue-500"
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip" className="capitalize">
          Skip
        </SelectItem>
        {OPTIONS.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;
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
