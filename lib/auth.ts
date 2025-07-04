import db from "@/db";
import { permission, role, user } from "@/db/schema";
import { rolesToPermissions } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { t } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

type PermissionCode = (typeof permission.$inferSelect)["code"];

export async function getUserPermissions(
  userId: string
): Promise<Set<PermissionCode>> {
  if (!userId) {
    return new Set();
  }

  const userPermissions = await db
    .select({
      code: permission.code,
    })
    .from(user)
    .innerJoin(role, eq(user.roleId, role.id))
    .innerJoin(rolesToPermissions, eq(role.id, rolesToPermissions.roleId))
    .innerJoin(permission, eq(rolesToPermissions.permissionId, permission.id))
    .where(eq(user.id, userId));

  return new Set(userPermissions.map((p) => p.code));
}

export const hasPermission = async (
  userId: string,
  permissions: PermissionCode[],
  all = true
) => {
  const userPermissions = await getUserPermissions(userId);
  console.log(userPermissions);
  return all
    ? permissions.every((p) => userPermissions.has(p))
    : permissions.some((p) => userPermissions.has(p));
};

export const permissionMiddleware = (
  permissions: PermissionCode[],
  all = true
) =>
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const has = await hasPermission(ctx.userId, permissions, all);
    if (!has) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message:
          "Access denied. You don't have permission to perform this action",
      });
    }
    return next({ ctx });
  });
