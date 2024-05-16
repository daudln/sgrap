import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { profile } from "./profile";

export const userRole = pgEnum("user_type", ["ADMIN", "USER"]);

export const user = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  isActive: boolean("isActive").notNull().default(true),
  role: userRole("role").notNull().default("USER"),
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

export const verificationToken = pgTable("verification_token", {
  token: varchar("id", { length: 100 })
    .primaryKey()
    .$defaultFn(() => createId()),
  email: varchar("email", { length: 100 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const resetPasswordToken = pgTable("password_reset_token", {
  token: varchar("id", { length: 100 })
    .primaryKey()
    .$defaultFn(() => createId()),
  email: varchar("email", { length: 100 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const usersRelations = relations(user, ({ one }) => ({
  profile: one(profile),
}));

export const createUserSchema = createInsertSchema(user)
  .extend({
    password: z.string().min(1, { message: "Password is required" }),
    passwordConfirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, { message: "Name is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    passwordConfirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
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
