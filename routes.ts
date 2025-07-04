/**
 * An array of routes that are public, they don't require authentication
 */

export const PUBLIC_ROUTES = ["/verify-email", "/reset-password"];

/**
 * An array of routes that are used for authentication
 */

export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password/[token]",
];

/**
 * An array of routes that are used for user profile
 */

export const PROFILE_ROUTES = ["/profile", "/profile", "/settings", "/logout"];

export const API_AUTH_PREFIX = "/api";

export const DEFAULT_LOGIN_REDIRECT = "/";

export const LOGIN_REDIRECT = "/login";
