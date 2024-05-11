import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  varchar,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { profile } from "./profile";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userRole = pgEnum("user_type", ["ADMIN", "USER"]);

export const user = pgTable("user", {
  id: varchar("id", { length: 100 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").notNull().unique(),
  role: userRole("role").notNull().default("USER"),
  emailVerified: timestamp("emai_verified", { mode: "date" }),
  password: text("password"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const verificationToken = pgTable(
  "email_verification_token",
  {
    token: varchar("token")
      .notNull()
      .$defaultFn(() => createId()),
    email: text("email").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.token, table.email] }),
  })
);

export const resetPasswordToken = pgTable(
  "password_reset_token",
  {
    token: varchar("token", { length: 100 })
      .notNull()
      .$defaultFn(() => createId()),
    email: varchar("email", { length: 100 }).notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.token, table.email] }),
  })
);

export const usersRelations = relations(user, ({ one }) => ({
  profile: one(profile),
}));

export const createUserSchema = createInsertSchema(user).pick({
  name: true,
  email: true,
  password: true,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = createInsertSchema(user).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
  emailVerified: true,
  password: true,
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
