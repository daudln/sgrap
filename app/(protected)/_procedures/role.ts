import { db } from "@/db";
import { role } from "@/db/schema";
import { RoleInput, rolesToPermissions } from "@/db/schema/auth";
import { permissionMiddleware } from "@/lib/auth";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const roleRouter = createTRPCRouter({
  getAll: protectedProcedure
    .use(permissionMiddleware(["can_view_roles"]))
    .query(async () => {
      const roles = await db.query.role.findMany({
        columns: {
          id: true,
          name: true,
        },
        with: {
          rolesToPermissions: {
            columns: {},
            with: {
              permission: {
                columns: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
      });

      const formatedRoles = roles.map((role) => {
        return {
          id: role.id,
          name: role.name,
          permissions: role.rolesToPermissions.map((roleToPermission) => {
            return {
              id: roleToPermission.permission.id,
              name: roleToPermission.permission.name,
              code: roleToPermission.permission.code,
            };
          }),
        };
      });
      return formatedRoles;
    }),
  create: protectedProcedure
    .use(permissionMiddleware(["can_create_role"]))
    .input(RoleInput)
    .mutation(async ({ ctx, input }) => {
      const { name, permissions } = input;
      // Check if role already exists
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
      //   Check if given permissions exist
      const existingPermissions = await db.query.permission.findMany({
        where: (table, { inArray }) => inArray(table.id, permissions),
      });

      if (existingPermissions.length !== permissions.length) {
        return {
          status: 400,
          success: false,
          message: "Some of the given permissions do not exist.",
        };
      }

      const [newRole] = await db.insert(role).values({ name }).returning();

      // Assign permissions to role
      await db.insert(rolesToPermissions).values(
        permissions.map((permissionId) => ({
          roleId: newRole.id,
          permissionId,
        }))
      );

      return {
        status: 200,
        success: true,
        message: "Role created successfully",
        role: newRole,
      };
    }),
});

export default roleRouter;
