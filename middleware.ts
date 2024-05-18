import {
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  API_AUTH_PREFIX,
  LOGIN_REDIRECT,
} from "@/routes";
import { NextRequest } from "next/server";
import { validateRequest } from "./auth";

export async function middleware(req: NextRequest) {
  // const { user } = await validateRequest();

  // const isLogin = true;
  // const { nextUrl } = req;
  // const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  // const isAuthRoute = AUTH_ROUTES.includes(req.nextUrl.pathname);
  // const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);
  // if (isApiAuthRoute) {
  //   return;
  // }

  // if (isAuthRoute) {
  //   if (isLogin) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return;
  // }
  // if (!isLogin && !isPublicRoute) {
  //   return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
  // }

  return;
}

export default middleware;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
