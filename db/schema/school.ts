import { baseTable } from "@/db/schema/base";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { student } from "@/db/schema/student";
import { teachersToSchools } from "@/db/schema/teacher";
import { district, region, street, ward } from "@/db/schema/setting";
import z from "zod";

export const schoolTypeEnum = pgEnum("school_type", ["GOVERNMENT", "PRIVATE"]);
export const schoolLevelEnum = pgEnum("school_level", [
  "NURSERY",
  "PRE_PRIMARY",
  "PRIMARY",
  "SECONDARY",
]);

export const school = pgTable("school", {
  ...baseTable,
  name: varchar("name", { length: 100 }).notNull(),
  registrationNumber: varchar("registration_number", { length: 50 })
    .notNull()
    .unique(),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 150 }),
  website: varchar("website", { length: 255 }),
  regionId: varchar("region_id", { length: 50 }).references(() => region.id, {
    onDelete: "set null",
  }),
  districtId: varchar("district_id", { length: 50 }).references(
    () => district.id,
    {
      onDelete: "set null",
    }
  ),
  wardId: varchar("ward_id", { length: 50 }).references(() => ward.id, {
    onDelete: "set null",
  }),
  streetId: varchar("street_id", { length: 50 }).references(() => street.id, {
    onDelete: "set null",
  }),
  type: schoolTypeEnum("type").notNull(),
  level: schoolLevelEnum("level").notNull(),
});

export const createSchoolSchema = createInsertSchema(school);

export const schoolSchema = createSchoolSchema
  .omit({
    isActive: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    wardId: true,
    regionId: true,
    districtId: true,
    streetId: true,
  })
  .extend({
    region: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullish(),
    district: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullish(),
    ward: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullish(),
    street: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullish(),
    id: z.string(),
  });

export type School = z.infer<typeof schoolSchema>;

export type SchoolTypeEnum = z.infer<typeof createSchoolSchema>["type"];

export type SchoolLevelEnum = z.infer<typeof createSchoolSchema>["level"];

export const updateSchoolSchema = createInsertSchema(school)
  .omit({
    registrationNumber: true,
  })
  .extend({
    id: z.string(),
  });

export const schoolRelations = relations(school, ({ many }) => ({
  students: many(student),
  teachers: many(teachersToSchools),
}));
