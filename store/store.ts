import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Store } from "./types";
import { createUploadDataSlice } from "@/store/upload-slice";

const storageKey = "local-storage"; // Define a storage key for easier reference

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createUploadDataSlice(...a),
        }))
      ),
      {
        name: storageKey,
        partialize: (state) => ({
          variant: state.variant,
          importResults: state.importResults,
          // Explicitly exclude selectedColumns
        }),
        // Other persist options you might have
      }
    )
  )
);
