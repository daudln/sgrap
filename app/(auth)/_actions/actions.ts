"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { user, role, permission } from "@/db/schema";
import { eq, or } from "drizzle-orm";

import { actionClient } from "@/lib/safe-action";
import {
  registerSchema,
  signInSchema,
  RoleInput,
  PermissionInput,
} from "@/schema/auth";

import { auth } from "@/auth";

export const signIn = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const response = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });
      return {
        status: 200,
        success: true,
        message: "Logged in successfully",
        ...response,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: 500,
          success: false,
          message: error.message,
        };
      }

      return {
        status: 401,
        success: false,
        message: "Invalid Credentials",
      };
    }
  });

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const response = await auth.api.signUpEmail({
        body: {
          name: parsedInput.name,
          email: parsedInput.email,
          password: parsedInput.password,
        },
      });
      return {
        status: 200,
        success: true,
        message: "User created successfully",
        ...response,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: "Something went wrong",
      };
    }
  });

export async function createRole({ name }: RoleInput) {
  try {
    const existingRole = await db.query.role.findFirst({
      where: (table, { eq }) => eq(table.name, name),
    });

    if (existingRole) {
      return {
        status: 400,
        success: false,
        message: "A role with this name already exists.",
      };
    }

    const [newRole] = await db.insert(role).values({ name }).returning();
    revalidatePath("/admin/roles");
    return {
      status: 200,
      success: true,
      message: "Role created successfully",
      role: newRole,
    };
  } catch (error) {
    console.error("Error creating role:", error);
    return {
      status: 500,
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function createPermission({ name, code }: PermissionInput) {
  try {
    const existingPermission = await db.query.permission.findFirst({
      where: (table, { eq }) => or(eq(table.name, name), eq(table.code, code)),
    });

    if (existingPermission) {
      return {
        status: 400,
        success: false,
        message: "A permission with this name or code already exists.",
      };
    }
    const [newPermission] = await db
      .insert(permission)
      .values({ name, code })
      .returning();

    // Revalidate paths where permissions are displayed
    revalidatePath("/admin/permissions");

    return {
      status: 200,
      success: true,
      message: "Permission created successfully",
      permission: newPermission,
    };
  } catch (error) {
    console.error("Error creating permission:", error);
    return {
      status: 500,
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function assignRoleToUser(userId: string, roleId: string) {
  try {
    const userExists = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });
    if (!userExists) {
      return {
        status: 404,
        success: false,
        message: "User not found.",
      };
    }

    const roleExists = await db.query.role.findFirst({
      where: eq(role.id, roleId),
    });
    if (!roleExists) {
      return {
        status: 404,
        success: false,
        message: "Role not found.",
      };
    }

    const [updatedUser] = await db
      .update(user)
      .set({ roleId })
      .where(eq(user.id, userId))
      .returning();

    // Revalidate the user's profile page or an admin users list
    revalidatePath(`/admin/users/${userId}`);
    revalidatePath("/admin/users");

    return {
      status: 200,
      success: true,
      message: "Role assigned successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error assigning role to user:", error);
    return {
      status: 500,
      success: false,
      message: "Something went wrong",
    };
  }
}
