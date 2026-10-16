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
import {
  clearAuthSession,
  getStoredToken,
  getStoredUser,
  setAuthSession,
} from "@/features/auth/tokenStore";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setSession: (session: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage, which isn't available during SSR;
    // runs once (empty deps) so it can't cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getStoredUser());
    setToken(getStoredToken());
    setIsHydrated(true);
  }, []);

  const setSession = useCallback((session: AuthResponse) => {
    setAuthSession(session);
    setUser(session.user);
    setToken(session.accessToken);
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isHydrated,
      setSession,
      logout,
    }),
    [user, token, isHydrated, setSession, logout],
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
