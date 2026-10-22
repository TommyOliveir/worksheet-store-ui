"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/context/AuthContext";
import { setUnauthorizedHandler } from "@/shared/api/session-events";

/**
 * Keeps this browser in step with the server's view of the session.
 *
 * A 401 that survives a token refresh means the session was revoked (a
 * logout elsewhere) or has lapsed. Without this the app keeps its user and
 * goes on rendering a signed-in UI that can't load anything.
 */
export function SessionSync() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  // Requests that fail together would each try to redirect. A ref rather than
  // context state makes the guard immediate: the first handler flips it
  // synchronously, so the rest stop there instead of waiting on a re-render.
  // It also ignores 401s for visitors who were never signed in.
  const signedInRef = useRef(false);

  useEffect(() => {
    signedInRef.current = user !== null;
  }, [user]);

  useEffect(() => {
    return setUnauthorizedHandler(() => {
      if (!signedInRef.current) {
        return;
      }
      signedInRef.current = false;

      logout();
      queryClient.clear();
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    });
  }, [logout, queryClient, router, pathname]);

  return null;
}
