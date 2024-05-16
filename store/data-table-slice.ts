import { FilterProps } from "@/components/datatable/toolbar";
import { Row } from "@tanstack/react-table";
import { StateCreator } from "zustand";

export interface DataTableStoreState<TData> {
  filterPlaceholder?: string;
  filters?: FilterProps[];
  getDataForExport?: (item: TData) => any;
  onDelete?: (rows: Row<TData>[]) => void;
  disabled?: boolean;
  hasUploadButton?: boolean;
  onUpload?: (results: any) => void;
}

export const createDataTableSlice =
  <TData>(): StateCreator<DataTableStoreState<TData>> =>
  (set, get) => ({
    filterPlaceholder: "",
    filters: [],
    getDataForExport: undefined,
    onDelete: undefined,
    disabled: false,
    hasUploadButton: false,
    onUpload: undefined,
    setFilterPlaceholder: (placeholder: string) =>
      set((state) => ({ ...state, filterPlaceholder: placeholder })),
    setFilters: (filters: FilterProps[]) =>
      set((state) => ({ ...state, filters })),
    setGetDataForExport: (getDataForExport: (item: TData) => any) =>
      set((state) => ({ ...state, getDataForExport })),
    setOnDelete: (onDelete: (rows: Row<TData>[]) => void) =>
      set((state) => ({ ...state, onDelete })),
    setDisabled: (disabled: boolean) =>
      set((state) => ({ ...state, disabled })),
    setHasUploadButton: (hasUploadButton: boolean) =>
      set((state) => ({ ...state, hasUploadButton })),
    setOnUpload: (onUpload: (results: any) => void) =>
      set((state) => ({ ...state, onUpload })),
  });
