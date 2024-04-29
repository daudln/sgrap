"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

export function SelectInput({
  options,
  label,
  className,
  onChange,
}: {
  options: { value: string; label: string }[];
  label?: string;
  className?: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const selectedOption = options?.find((option) => option.value === value);
  React.useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-[150px] justify-start", className)}
          >
            {selectedOption?.value ? (
              <>{selectedOption.label}</>
            ) : (
              <>
                Set {label} <ChevronsUpDown className="ml-auto h-4 w-4" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="center">
          <OptionList setOpen={setOpen} setValue={setValue} options={options} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[150px] justify-start", className)}
        >
          {selectedOption?.value ? (
            <>{selectedOption.label}</>
          ) : (
            <>
              Set {label} <ChevronsUpDown className="ml-auto h-4 w-4" />
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList setOpen={setOpen} setValue={setValue} options={options} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  setValue,
  setOpen,
  options,
}: {
  setOpen: (open: boolean) => void;
  setValue: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const handleSelect = (value: string) => {
    setValue(value);
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={() => {
                handleSelect(option.value);
              }}
            >
              {option.label}
              <Check
                className={cn(
                  "ml-auto h-4 w-4 opacity-0",
                  selectedValue === option.value && "opacity-100"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
