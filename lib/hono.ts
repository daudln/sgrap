import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

export const trpc = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
