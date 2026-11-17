"use client";

import { useMemo } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useMyOrders } from "@/features/orders/hooks/useMyOrders";

// A worksheet is owned once it appears in any paid order; GET /orders only
// returns COMPLETED ones, the same rule the API applies to downloads and
// checkout. Shares the Purchases page's cache, so it adds no request.
export function useOwnedWorksheetIds() {
  const { user, isHydrated } = useAuth();
  const { data, isPending } = useMyOrders(user?.id);

  const ownedIds = useMemo(
    () =>
      new Set(
        data?.flatMap((order) => order.items.map((item) => item.worksheetId)),
      ),
    [data],
  );

  // A disabled query stays "pending" forever, so only a signed-in user can
  // be waiting on their orders.
  const isLoading = !isHydrated || (user !== null && isPending);

  return { ownedIds, isLoading };
}
