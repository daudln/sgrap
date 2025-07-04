import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectInputProps = {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
  placeholder?: string;
};

export default function SelectInput({
  label,
  options,
  className,
  placeholder,
}: SelectInputProps) {
  return (
    <Select>
      <SelectTrigger className={cn("w-[180px]", className)}>
        {placeholder && <SelectValue placeholder={placeholder} />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
