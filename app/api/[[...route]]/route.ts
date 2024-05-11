import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import subjectRoute from "./subjects";
import schoolsRoute from "./schools";
import { authHandler, initAuthConfig } from "@hono/auth-js";
import { providers } from "@/auth.config";
import accountRoute from "./account";

export const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));
app.use("/auth/*", authHandler());

app.get("/google", (c) =>
  c.json({
    name: "Google",
    url: "https://www.google.com",
  })
);

function getAuthConfig(c: Context) {
  return {
    secret: c.env.AUTH_SECRET,
    providers: providers,
  };
}

const routes = app
  .route("/", subjectRoute)
  .route("/", schoolsRoute)
  .route("/", accountRoute);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
