import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const region = pgTable("region", {
  id: varchar("id", { length: 50 }).primaryKey().notNull().$defaultFn(createId),
  name: varchar("name", { length: 100 }).notNull().unique(),
  code: varchar("code", { length: 50 }).notNull().unique(),
});

export const district = pgTable("district", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  region_id: varchar("region_id", { length: 50 })
    .notNull()
    .references(() => region.id, { onDelete: "cascade" }),
});

export const ward = pgTable("ward", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  district_id: varchar("district_id", { length: 50 })
    .notNull()
    .references(() => district.id, { onDelete: "cascade" }),
});

export const street = pgTable("street", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  ward_id: varchar("ward_id", { length: 50 })
    .notNull()
    .references(() => ward.id, { onDelete: "cascade" }),
});

export const regionRelations = relations(region, ({ many }) => ({
  districts: many(district),
}));

export const districtRelations = relations(district, ({ one, many }) => ({
  region: one(region, {
    fields: [district.region_id],
    references: [region.id],
  }),
  wards: many(ward),
}));

export const wardRelations = relations(ward, ({ one, many }) => ({
  district: one(district, {
    fields: [ward.district_id],
    references: [district.id],
  }),
  streets: many(street),
}));

export const streetRelations = relations(street, ({ one }) => ({
  ward: one(ward, {
    fields: [street.ward_id],
    references: [ward.id],
  }),
}));
