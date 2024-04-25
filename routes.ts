/**
 * An array of routes that are public, they don't require authentication
 */

export const PUBLIC_ROUTES = [
  "/",
  "/auth/verify-email",
  "/auth/reset-password",
];

/**
 * An array of routes that are used for authentication
 */

export const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password/[token]",
];

/**
 * An array of routes that are used for user profile
 */

export const PROFILE_ROUTES = ["/profile", "/profile", "/settings", "/logout"];

export const API_AUTH_PREFIX = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const LOGIN_REDIRECT = "/auth/login";
