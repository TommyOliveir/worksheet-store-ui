"use client";

import Link from "next/link";
import { LogOut, Receipt } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/shared/lib/initials";
import type { AuthUser } from "@/features/auth/types/auth.types";

interface UserMenuProps {
  user: AuthUser;
  isLoggingOut: boolean;
  onLogout: () => void;
}

export const UserMenu = ({ user, isLoggingOut, onLogout }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      aria-label="Account menu"
      className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary transition outline-none hover:bg-primary/15 focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:ring-2 data-popup-open:ring-primary/30"
    >
      {getInitials(user.fullName)}
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" sideOffset={8} className="w-60">
      <div className="px-2 py-2">
        <p className="truncate text-sm font-semibold text-slate-900">
          {user.fullName}
        </p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="cursor-pointer"
        render={<Link href="/purchases" />}
      >
        <Receipt />
        My purchases
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={onLogout}
        disabled={isLoggingOut}
      >
        <LogOut />
        {isLoggingOut ? "Logging out..." : "Log out"}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
