import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context";
import { getLoginUrl } from "@/lib/auth-utils";

/**
 * Hook to require authentication for a page
 * Redirects to login if user is not authenticated
 * Preserves the current path as a return URL
 */
export function useRequireAuth() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(getLoginUrl(pathname));
    }
  }, [user, isLoading, router, pathname]);

  return { user, isLoading };
}
