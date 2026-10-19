"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import { PurchaseOrder } from "@/features/orders/types/order.types";

async function fetchMyOrders(): Promise<PurchaseOrder[]> {
  const res = await apiClient.get<PurchaseOrder[]>("/orders");
  return res.data;
}

export function useMyOrders(enabled: boolean) {
  return useQuery({
    queryKey: ["orders", "mine"] as const,
    queryFn: fetchMyOrders,
    enabled,
  });
}
