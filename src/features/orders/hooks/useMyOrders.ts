"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import { PurchaseOrder } from "@/features/orders/types/order.types";

async function fetchMyOrders(): Promise<PurchaseOrder[]> {
  const res = await apiClient.get<PurchaseOrder[]>("/orders");
  return res.data;
}

// Keyed by user id: a shared key would let the next person to log in on this
// browser read the previous one's orders out of the cache.
export function useMyOrders(userId: string | undefined) {
  return useQuery({
    queryKey: ["orders", "mine", userId] as const,
    queryFn: fetchMyOrders,
    enabled: Boolean(userId),
  });
}
