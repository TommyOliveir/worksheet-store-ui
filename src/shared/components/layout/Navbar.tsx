"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useIsClient } from "@/shared/hooks/useIsClient";
import { AuthActions } from "@/shared/components/layout/AuthActions";
import { AuthPlaceholder } from "@/shared/components/layout/AuthPlaceholder";
import { BrandLogo } from "@/shared/components/layout/BrandLogo";
import { CartButton } from "@/shared/components/layout/CartButton";
import { MobileNav } from "@/shared/components/layout/MobileNav";
import { NavLinks } from "@/shared/components/layout/NavLinks";
import { UserMenu } from "@/shared/components/layout/UserMenu";
import { visibleNavLinks } from "@/shared/components/layout/navLinks";
import type { AuthNavState } from "@/shared/types/navigation";

// Smart component: reads the session, cart and route, and hands plain props
// to the presentational pieces.
export default function Navbar() {
  const pathname = usePathname();
  const { cart, toggleCart } = useCartStore();
  const { user, isAuthenticated, isHydrated } = useAuth();
  const { logout, isLoggingOut } = useLogout();
  const isClient = useIsClient();

  const authState: AuthNavState = !isHydrated
    ? "checking"
    : isAuthenticated
      ? "signedIn"
      : "signedOut";
  const links = visibleNavLinks(authState === "signedIn");
  const handleLogout = () => logout();

  const DESKTOP_AUTH: Record<AuthNavState, () => ReactNode> = {
    checking: () => <AuthPlaceholder />,
    signedIn: () =>
      user && (
        <UserMenu
          user={user}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
        />
      ),
    signedOut: () => <AuthActions orientation="row" />,
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/70 backdrop-blur-md supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center gap-6 px-4">
        <BrandLogo />

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks links={links} pathname={pathname} orientation="row" />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <CartButton
            count={cart.length}
            showCount={isClient}
            onClick={toggleCart}
          />
          <div className="hidden items-center md:flex">
            {DESKTOP_AUTH[authState]()}
          </div>
          <MobileNav
            links={links}
            pathname={pathname}
            authState={authState}
            user={user}
            isLoggingOut={isLoggingOut}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
