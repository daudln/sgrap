import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    return db.query.user.findFirst({
      where: eq(user.id, ctx.userId!),
    });
  }),
});

export default authRouter;
