"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import { VerifiedCheckoutSession } from "@/shared/types/order";

async function fetchCheckoutSession(
  sessionId: string,
): Promise<VerifiedCheckoutSession> {
  const res = await apiClient.get<VerifiedCheckoutSession>(
    `/orders/session/${sessionId}`,
  );
  return res.data;
}

export function useVerifyCheckoutSession(sessionId: string | null) {
  return useQuery({
    queryKey: ["checkout-session", sessionId],
    queryFn: () => fetchCheckoutSession(sessionId as string),
    enabled: Boolean(sessionId),
    retry: 1,
    refetchInterval: (query) =>
      query.state.data?.status === "pending" ? 3000 : false,
  });
}
