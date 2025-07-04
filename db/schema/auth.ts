import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { profile } from "@/db/schema/profile";
import { baseTable } from "@/db/schema/base";
import { unique } from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const userTypeEnum = pgEnum("user_type_enum", ["ADMIN", "USER", "STUDENT"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  userType: userTypeEnum("user_type_enum").default("USER"),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  roleId: varchar("role_id", { length: 50 }).references(() => role.id),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const resetPasswordToken = pgTable("password_reset_token", {
  token: varchar("id", { length: 100 }).primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const role = pgTable(
  "role",
  {
    ...baseTable,
    name: varchar({ length: 100 }).unique().notNull(),
  },
  (t) => [index().on(t.name)]
);

export const permission = pgTable(
  "permission",
  {
    ...baseTable,
    name: varchar({ length: 100 }).notNull().unique(),
    code: varchar({ length: 100 }).notNull().unique(),
  },
  (t) => [
    unique().on(t.name, t.code),
    index().on(t.name),
    index("code_index").on(t.code),
  ]
);

export const rolesToPermissions = pgTable(
  "roles_to_permissions",
  {
    roleId: varchar("role_id", { length: 50 })
      .notNull()
      .references(() => role.id),
    permissionId: varchar("permission_id", { length: 50 })
      .notNull()
      .references(() => permission.id),
  },
  (t) => [
    primaryKey({ columns: [t.roleId, t.permissionId] }),
    unique().on(t.roleId, t.permissionId),
  ]
);

export const userRelations = relations(user, ({ one }) => ({
  profile: one(profile),
  role: one(role, {
    fields: [user.roleId],
    references: [role.id],
  }),
}));

export const rolesRelations = relations(role, ({ many }) => ({
  users: many(user),
  rolesToPermissions: many(rolesToPermissions),
}));

export const permissionsRelations = relations(permission, ({ many }) => ({
  rolesToPermissions: many(rolesToPermissions),
}));

export const rolesToPermissionsRelations = relations(
  rolesToPermissions,
  ({ one }) => ({
    role: one(role, {
      fields: [rolesToPermissions.roleId],
      references: [role.id],
    }),
    permission: one(permission, {
      fields: [rolesToPermissions.permissionId],
      references: [permission.id],
    }),
  })
);

export const RoleInput = createInsertSchema(role).extend({
  permissions: z.array(z.string()),
});
