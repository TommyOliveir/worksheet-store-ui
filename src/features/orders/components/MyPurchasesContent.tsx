"use client";

import Link from "next/link";
import { Loader2, LogIn, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useMyOrders } from "@/features/orders/hooks/useMyOrders";
import { StatusCard } from "@/features/checkout/components/StatusCard";
import { ContinueShoppingButton } from "@/features/checkout/components/ContinueShoppingButton";
import { DownloadButton } from "@/features/checkout/components/DownloadButton";

export default function MyPurchasesContent() {
  const { user, isAuthenticated, isHydrated } = useAuth();
  const { data, isPending, isError, refetch, isRefetching } = useMyOrders(
    user?.id,
  );

  if (!isHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <StatusCard
        icon={<LogIn className="size-12 text-primary" />}
        title="Log in to see your purchases"
        description="Your purchased worksheets are only available to download from your own account."
      >
        <Button
          className="mt-6"
          nativeButton={false}
          render={
            <Link href={`/login?redirect=${encodeURIComponent("/purchases")}`}>
              Log in
            </Link>
          }
        />
      </StatusCard>
    );
  }

  if (isPending) {
    return (
      <StatusCard
        icon={<Loader2 className="size-12 text-primary animate-spin" />}
        title="Loading your purchases..."
        description="Just a moment."
      />
    );
  }

  if (isError) {
    return (
      <StatusCard
        icon={<XCircle className="size-12 text-destructive" />}
        title="Couldn't load your purchases"
        description="Something went wrong. Please try again."
      >
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          {isRefetching ? "Retrying..." : "Try again"}
        </Button>
      </StatusCard>
    );
  }

  if (!data || data.length === 0) {
    return (
      <StatusCard
        icon={<XCircle className="size-12 text-muted-foreground" />}
        title="No purchases yet"
        description="Worksheets you buy will show up here, ready to download anytime."
      >
        <ContinueShoppingButton />
      </StatusCard>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-16">
      <h1 className="text-2xl font-bold mb-6">My purchases</h1>
      <div className="flex flex-col gap-6">
        {data.map((order) => (
          <div
            key={order.id}
            className="bg-card text-card-foreground p-6 border border-border rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>
                Order placed {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span>${Number(order.totalAmount).toFixed(2)}</span>
            </div>
            <ul className="flex flex-col gap-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="font-medium">{item.worksheet.title}</span>
                  <DownloadButton worksheetId={item.worksheetId} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
