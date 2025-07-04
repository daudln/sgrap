"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface SelectInputProps {
  options: { value: string; label: string }[];
  label?: string;
  className?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  selectedValue?: string | null | undefined;
}

export function SelectInput({
  options,
  label,
  className,
  onChange,
  placeholder = "Select an option",
  isLoading = false,
  disabled = false,
  selectedValue,
}: SelectInputProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue);
    }
  }, [selectedValue]);

  const selectedOption = options?.find((option) => option.value === value);

  React.useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const Indicator = isLoading ? (
    <Loader2 className="ml-auto h-4 w-4 animate-spin text-muted-foreground" />
  ) : (
    <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
  );

  const OptionItems = options.map((option) => (
    <CommandItem
      key={option.value}
      value={option.label}
      onSelect={() => {
        setValue(option.value);
        setOpen(false);
      }}
    >
      {option.label}
      <Check
        className={cn(
          "ml-auto h-4 w-4",
          value === option.value ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  ));

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start", className)}
            disabled={isLoading || disabled}
          >
            {selectedOption?.label ? (
              <>{selectedOption.label}</>
            ) : (
              <>
                Set {label} {Indicator}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="center">
          <Command>
            <CommandInput
              placeholder={placeholder}
              disabled={isLoading || disabled}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>{OptionItems}</CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start", className)}
          disabled={isLoading}
        >
          {selectedOption?.label ? (
            <>{selectedOption.label}</>
          ) : (
            <>
              Set {label} {Indicator}
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <Command>
            <CommandInput
              placeholder={`Search ${placeholder}`}
              disabled={isLoading}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>{OptionItems}</CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
