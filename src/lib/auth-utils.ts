/**
 * Utility functions for authentication and authorization
 */

/**
 * Build a login URL with a return path
 * @param returnPath - The path to return to after login
 * @returns Login URL with return path as query parameter
 */
export function getLoginUrl(returnPath?: string): string {
  const path = returnPath || (typeof window !== "undefined" ? window.location.pathname : "/");
  return `/login?redirect=${encodeURIComponent(path)}`;
}

/**
 * Get the redirect path from URL query parameters
 * @returns The redirect path or default to home
 */
export function getRedirectPath(): string {
  if (typeof window === "undefined") return "/";

  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  return redirect || "/";
}

/**
 * Check if a path requires authentication
 * @param path - The path to check
 * @returns true if the path requires authentication
 */
export function requiresAuth(path: string): boolean {
  const protectedPaths = [
    "/account",
    "/orders",
    "/checkout",
  ];

  return protectedPaths.some(protectedPath => path.startsWith(protectedPath));
}
