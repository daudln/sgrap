import { z } from "zod";
import type { ReactNode } from "react";

export const NAVIGATION_LINK = z.object({
  link: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
});
