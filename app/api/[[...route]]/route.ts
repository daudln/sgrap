import { Hono } from "hono";
import { handle } from "hono/vercel";
import subjectRoute from "./subjects";
import schoolsRoute from "./schools";
import accountRoute from "./account";

export const app = new Hono().basePath("/api");

const routes = app
  .route("/", subjectRoute)
  .route("/", schoolsRoute)
  .route("/", accountRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
