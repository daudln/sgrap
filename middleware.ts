import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  API_AUTH_PREFIX,
  LOGIN_REDIRECT,
} from "@/routes";
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const isLogin = !!req.auth;
    const { nextUrl } = req;
    const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
    const isAuthRoute = AUTH_ROUTES.includes(req.nextUrl.pathname);
    const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);
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
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
