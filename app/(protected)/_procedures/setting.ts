import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { region, district, ward, street } from "@/db/schema/setting";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const settingRouter = createTRPCRouter({
  getRegions: protectedProcedure.query(async () => {
    return await db.select().from(region);
  }),

  getDistricts: protectedProcedure
    .input(z.object({ regionId: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(district)
        .where(eq(district.region_id, input.regionId));
    }),

  getWards: protectedProcedure
    .input(z.object({ districtId: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(ward)
        .where(eq(ward.district_id, input.districtId));
    }),

  getStreets: protectedProcedure
    .input(z.object({ wardId: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(street)
        .where(eq(street.ward_id, input.wardId));
    }),

  getFullHierarchy: protectedProcedure.query(async () => {
    const regions = await db.query.region.findMany({
      with: {
        districts: {
          with: {
            wards: {
              with: {
                streets: true,
              },
            },
          },
        },
      },
    });

    return regions;
  }),
});

export default settingRouter;
