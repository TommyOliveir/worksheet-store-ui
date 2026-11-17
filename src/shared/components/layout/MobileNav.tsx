"use client";

import { useState, type ReactNode } from "react";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthActions } from "@/shared/components/layout/AuthActions";
import { AuthPlaceholder } from "@/shared/components/layout/AuthPlaceholder";
import { BrandLogo } from "@/shared/components/layout/BrandLogo";
import { NavLinks } from "@/shared/components/layout/NavLinks";
import type { AuthUser } from "@/features/auth/types/auth.types";
import type { AuthNavState, NavLink } from "@/shared/types/navigation";

interface MobileNavProps {
  links: NavLink[];
  pathname: string;
  authState: AuthNavState;
  user: AuthUser | null;
  isLoggingOut: boolean;
  onLogout: () => void;
}

// Presentational: the only state it owns is whether the sheet is open.
export function MobileNav({
  links,
  pathname,
  authState,
  user,
  isLoggingOut,
  onLogout,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const AUTH_FOOTER: Record<AuthNavState, () => ReactNode> = {
    checking: () => <AuthPlaceholder className="h-9 w-full rounded-lg" />,
    signedIn: () =>
      user && (
        <>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user.fullName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              close();
              onLogout();
            }}
            disabled={isLoggingOut}
          >
            <LogOut />
            {isLoggingOut ? "Logging out..." : "Log out"}
          </Button>
        </>
      ),
    signedOut: () => <AuthActions orientation="column" onNavigate={close} />,
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="cursor-pointer text-slate-700 md:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72 gap-0 p-0">
        <SheetHeader className="border-b">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <BrandLogo onNavigate={close} />
        </SheetHeader>
        <nav aria-label="Main" className="p-4">
          <NavLinks
            links={links}
            pathname={pathname}
            orientation="column"
            onNavigate={close}
          />
        </nav>
        <SheetFooter className="border-t">
          {AUTH_FOOTER[authState]()}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
