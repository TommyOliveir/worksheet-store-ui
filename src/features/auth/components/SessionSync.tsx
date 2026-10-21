"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getStoredToken } from "@/features/auth/tokenStore";
import { setUnauthorizedHandler } from "@/shared/api/session-events";

/**
 * Keeps this browser in step with the server's view of the session.
 *
 * A 401 on an authenticated request means the session was revoked (a logout
 * elsewhere) or has lapsed. Without this the app keeps its stored token and
 * goes on rendering a signed-in UI that can't load anything.
 */
export function SessionSync() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    return setUnauthorizedHandler(() => {
      // Requests that fail together would each try to redirect. Reading
      // storage rather than context state makes the guard immediate: the
      // first handler clears the token synchronously, so the rest stop here
      // instead of waiting on a re-render.
      if (!getStoredToken()) {
        return;
      }

      logout();
      queryClient.clear();
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    });
  }, [logout, queryClient, router, pathname]);

  return null;
}
