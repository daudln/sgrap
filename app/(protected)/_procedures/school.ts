import {
  createTRPCRouter,
  paginatedProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { db } from "@/db";
import { district, region, school, street, ward } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import z from "zod";
import { permissionMiddleware } from "@/lib/auth";
import { createSchoolSchema, updateSchoolSchema } from "@/db/schema/school";
import { inferProcedureOutput, inferRouterOutputs } from "@trpc/server";

export const schoolRouter = createTRPCRouter({
  getAll: paginatedProcedure
    .use(permissionMiddleware(["can_view_schools"]))
    .query(async ({ ctx }) => {
      const { limit, offset } = ctx.pagination;
      const schools = await db
        .select({
          id: school.id,
          name: school.name,
          registrationNumber: school.registrationNumber,
          address: school.address,
          level: school.level,
          phone: school.phone,
          type: school.type,
          email: school.email,
          website: school.website,
          street: {
            id: street.id,
            name: street.name,
          },
          ward: {
            id: ward.id,
            name: ward.name,
          },
          district: {
            id: district.id,
            name: district.name,
          },
          region: {
            id: region.id,
            name: region.name,
          },
        })
        .from(school)
        .leftJoin(street, eq(school.streetId, street.id))
        .leftJoin(ward, eq(school.wardId, ward.id))
        .leftJoin(district, eq(ward.district_id, district.id))
        .leftJoin(region, eq(district.region_id, region.id))
        .limit(limit)
        .offset(offset);
      const [total] = await db.select({ count: count() }).from(school);
      return {
        schools,
        pagination: {
          total: total.count,
          page: ctx.pagination.page,
          pageSize: ctx.pagination.pageSize,
          totalPages: Math.ceil(total.count / ctx.pagination.pageSize),
          hasMore: offset + limit < total.count,
        },
      };
    }),

  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [schoolDetail] = await db
        .select({
          id: school.id,
          name: school.name,
          registrationNumber: school.registrationNumber,
          address: school.address,
          level: school.level,
          phone: school.phone,
          type: school.type,
          email: school.email,
          website: school.website,
          street: {
            id: street.id,
            name: street.name,
          },
          ward: {
            id: ward.id,
            name: ward.name,
          },
          district: {
            id: district.id,
            name: district.name,
          },
          region: {
            id: region.id,
            name: region.name,
          },
        })
        .from(school)
        .leftJoin(street, eq(school.streetId, street.id))
        .leftJoin(ward, eq(school.wardId, ward.id))
        .leftJoin(district, eq(ward.district_id, district.id))
        .leftJoin(region, eq(district.region_id, region.id))
        .where(eq(school.id, input.id))
        .limit(1);
      return schoolDetail;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return db.delete(school).where(eq(school.id, input.id));
    }),
  create: protectedProcedure
    .input(createSchoolSchema)
    .mutation(async ({ input }) => {
      return db.insert(school).values({
        name: input.name,
        level: input.level,
        registrationNumber: input.registrationNumber,
        address: input.address,
        phone: input.phone,
        email: input.email,
        website: input.website,
        type: input.type,
        regionId: input.regionId,
        districtId: input.districtId,
        wardId: input.wardId,
        streetId: input.streetId,
      });
    }),
  update: protectedProcedure
    .input(updateSchoolSchema)
    .mutation(async ({ input }) => {
      return db
        .update(school)
        .set({
          name: input.name,
          level: input.level,
          address: input.address,
          phone: input.phone,
          email: input.email,
          website: input.website,
          type: input.type,
          regionId: input.regionId,
          districtId: input.districtId,
          wardId: input.wardId,
          streetId: input.streetId,
        })
        .where(eq(school.id, input.id));
    }),
});

export default schoolRouter;

export type SchoolRouter = inferRouterOutputs<typeof schoolRouter>;

export type SchoolRouterOutput = inferProcedureOutput<
  (typeof schoolRouter)["getOne"]
>;
