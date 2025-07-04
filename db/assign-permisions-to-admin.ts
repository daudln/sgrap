import { db } from "@/db";
import { rolesToPermissions } from "@/db/schema";

export async function assignPermissionsToAdmin() {
  const adminRole = await db.query.role.findFirst({
    where: (table, { eq }) => eq(table.name, "ADMIN"),
  });

  if (!adminRole) {
    throw new Error("ADMIN role not found.");
  }

  const permissions = await db.query.permission.findMany({
    columns: {
      id: true,
    },
  });

  await Promise.all(
    permissions.map(async (permission) => {
      await db
        .insert(rolesToPermissions)
        .values({
          roleId: adminRole.id,
          permissionId: permission.id,
        })
        .onConflictDoNothing();
    })
  );
  console.log("✅ Seed complete.");
}

assignPermissionsToAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
