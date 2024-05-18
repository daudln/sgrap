import { Hono } from "hono";
import { handle } from "hono/vercel";
import subjectRoute from "@/app/api/[[...route]]/subjects";
import schoolsRoute from "@/app/api/[[...route]]/school";
import accountRoute from "@/app/api/[[...route]]/account";
import studentRoute from "@/app/api/[[...route]]/student";
import teacherRoute from "@/app/api/[[...route]]/teacher";

const app = new Hono().basePath("/api");

const routes = app
  .route("/", subjectRoute)
  .route("/", schoolsRoute)
  .route("/", accountRoute)
  .route("/", studentRoute)
  .route("/", teacherRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
