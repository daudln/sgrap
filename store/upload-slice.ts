import { INITIAL_IMPORT_RESULTS } from "@/lib/constants";
import { produce } from "immer";
import { StateCreator } from "zustand";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

export type UploadDataStates = {
  variant: VARIANTS;
  importResults: typeof INITIAL_IMPORT_RESULTS;
  selectedColumns: SelectedColumnsState;
};

export type UploadDataActions = {
  onUpload: (results: typeof INITIAL_IMPORT_RESULTS) => void;
  onCancelImport: () => void;
  setVariant: (variant: VARIANTS) => void;
  setImportResults: (results: typeof INITIAL_IMPORT_RESULTS) => void;
  setSelectedColumns: (columnIndex: number, value: string | null) => void;
  resetUploadData: () => void;
  processAndSubmitData: (
    headers: string[],
    body: string[][],
    onSubmit: (data: any[]) => void
  ) => void;
};

export type UploadDataSlice = UploadDataStates & UploadDataActions;

type SelectedColumnsState = Record<string, string | null>;

const initialState: UploadDataStates = {
  variant: VARIANTS.LIST,
  importResults: INITIAL_IMPORT_RESULTS,
  selectedColumns: {},
};

export const createUploadDataSlice: StateCreator<
  UploadDataSlice,
  [["zustand/immer", never]],
  [],
  UploadDataSlice
> = (set, get) => ({
  ...initialState,
  onUpload: (results) =>
    set((state) => {
      state.variant = VARIANTS.IMPORT;
      state.importResults = results;
    }),

  onCancelImport: () =>
    set((state) => {
      state.variant = VARIANTS.LIST;
      state.importResults = INITIAL_IMPORT_RESULTS;
    }),

  setVariant: (variant) => set((state) => ({ ...state, variant })),

  setImportResults: (results) =>
    set((state) => ({ ...state, importResults: results })),

  setSelectedColumns: (columnIndex: number, value: string | null) =>
    set(
      produce((draft) => {
        for (const columnId in draft.selectedColumns) {
          if (draft.selectedColumns[columnId] === value) {
            draft.selectedColumns[columnId] = null;
          }
        }
        const columnId = `column_${columnIndex}`;
        draft.selectedColumns[columnId] = value === "skip" ? null : value;
      })
    ),
  resetUploadData: () =>
    set(() => ({
      variant: VARIANTS.LIST,
      importResults: INITIAL_IMPORT_RESULTS,
      selectedColumns: {},
    })),
  processAndSubmitData: (
    headers: string[],
    body: string[][],
    onSubmit: (data: any[]) => void
  ) => {
    set(
      produce((draft) => {
        const getColumnIndex = (column: string) => {
          return column.split("_")[1];
        };

        const nonEmptyColumns = headers.filter((_header, index) => {
          const columnIndex = getColumnIndex(`column_${index}`);
          return draft.selectedColumns[`column_${columnIndex}`];
        });

        const mappedData = {
          headers: headers
            .map((_header, index) => {
              const columnIndex = getColumnIndex(`column_${index}`);
              return draft.selectedColumns[`column_${columnIndex}`] || null;
            })
            .filter(Boolean),
          body: body
            .map((row) => {
              const transformedRow = row.map((cell, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);
                return draft.selectedColumns[`column_${columnIndex}`]
                  ? cell
                  : null;
              });
              return transformedRow.every((item) => item === null)
                ? []
                : transformedRow.filter(Boolean);
            })
            .filter((row) => row.length > 0),
        };

        const arrayOfData = mappedData.body.map((row) => {
          return row.reduce((acc: any, cell, index) => {
            const header = mappedData.headers[index];
            if (header !== null) {
              acc[header] = cell;
            }
            return acc;
          }, {});
        });
        onSubmit(arrayOfData);
      })
    );
  },
});
