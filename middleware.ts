import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_REDIRECT,
  PUBLIC_ROUTES,
} from "@/routes";
import { NextConfig } from "next";
import { type NextRequest } from "next/server";

import { getSessionCookie } from "better-auth/cookies";

export default async function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);
  const isLogin = !!sessionCookie;

  const { nextUrl } = req;
  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isAuthRoute = AUTH_ROUTES.includes(req.nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);
  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLogin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLogin && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
  }

  return;
}

export const config: NextConfig = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
