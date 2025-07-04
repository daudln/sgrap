import auth from "@/auth";
import limiter from "@/lib/ratelimit";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";

import z from "zod";

export const paginationInput = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
});
export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: session?.user?.id };
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export const t = initTRPC.context<TRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { remainingPoints } = await limiter.consume(ctx.userId);

  if (remainingPoints < 0) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }
  return next({ ctx });
});

export const publicProcedure = t.procedure;

export const paginationMiddleware = t.middleware(async (opts) => {
  const { page, pageSize } = paginationInput.parse(
    opts.input as z.infer<typeof paginationInput>
  );

  const offset = (page - 1) * pageSize;

  return opts.next({
    ctx: {
      ...opts.ctx,
      pagination: { page, pageSize, offset, limit: pageSize },
    },
  });
});

export const paginatedProcedure = t.procedure
  .input(paginationInput)
  .use(paginationMiddleware);
