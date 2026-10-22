"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthResponse, AuthUser } from "@/features/auth/types/auth.types";
import { get } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setSession: (session: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // The session lives in httpOnly cookies this code can't read, so the only
    // way to learn who is signed in is to ask the API. A 401 here just means
    // nobody is, which is not a lost session to redirect over.
    get<AuthUser>(ENDPOINTS.users.me, { skipAuthRedirect: true })
      .then(
        (me) => {
          if (!cancelled) setUser(me);
        },
        () => undefined,
      )
      .finally(() => {
        if (!cancelled) setIsHydrated(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setSession = useCallback((session: AuthResponse) => {
    setUser(session.user);
  }, []);

  // Local state only. Ending the session server-side, which also clears the
  // cookies, is useLogout's job.
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isHydrated,
      setSession,
      logout,
    }),
    [user, isHydrated, setSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
