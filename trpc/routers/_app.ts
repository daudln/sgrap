import authRouter from "@/app/(protected)/_procedures/auth";
import roleRouter from "@/app/(protected)/_procedures/role";
import schoolRouter from "@/app/(protected)/_procedures/school";
import { settingRouter } from "@/app/(protected)/_procedures/setting";
import statsRouter from "@/app/(protected)/_procedures/stats";
import studentRouter from "@/app/(protected)/_procedures/student";
import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  school: schoolRouter,
  stats: statsRouter,
  auth: authRouter,
  student: studentRouter,
  role: roleRouter,
  setting: settingRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
