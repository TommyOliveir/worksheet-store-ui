"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function Navbar() {
  const { cart, toggleCart } = useCartStore();
  const { user, isAuthenticated } = useAuth();
  const { logout, isLoggingOut } = useLogout();

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-indigo-600">
          WorksheetStore
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/worksheets"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Catalog
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/purchases"
                className="text-sm font-medium text-slate-700 hover:text-indigo-600"
              >
                My purchases
              </Link>
              <span className="text-sm text-slate-600">
                Hi, {user?.fullName.split(" ")[0]}
              </span>
              <button
                onClick={() => logout()}
                disabled={isLoggingOut}
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-indigo-600"
            >
              Log in
            </Link>
          )}
          <button
            onClick={toggleCart}
            className="relative bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition"
          >
            Cart ({cart.length})
          </button>
        </nav>
      </div>
    </header>
  );
}
