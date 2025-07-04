import { customType } from "drizzle-orm/pg-core";

export const bytea = customType<{
  data: Uint8Array;
  notNull: false;
  default: false;
}>({
  dataType() {
    return "bytea";
  },
});

export const timerange = customType<{
  data: [Date, Date | null];
  notNull: false;
  default: false;
}>({
  dataType() {
    return "timerange";
  },
});
