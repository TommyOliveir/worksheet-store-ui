"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "@/store/useCartStore";
import { ApiError, post } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";
import type {
  CheckoutPayload,
  CheckoutResponse,
} from "@/features/checkout/types/order.types";

const UNKNOWN_ERROR = "Failed to start checkout. Please try again.";

export default function CheckoutButton() {
  const { cart, getTotal } = useCartStore();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent("/worksheets")}`);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const worksheetIds = cart.map((item) => item.id);

      const { url } = await post<CheckoutResponse, CheckoutPayload>(
        ENDPOINTS.orders.checkout,
        { worksheetIds },
      );
      window.location.href = url;
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError ? error.message : UNKNOWN_ERROR,
      );

      // A 409 means the cart holds something this account already owns,
      // likely bought elsewhere since the purchases were last loaded.
      // Refetching them lets the cart drop those items by itself.
      if (error instanceof ApiError && error.status === 409) {
        queryClient.invalidateQueries({ queryKey: ["orders", "mine"] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0 || loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 transition"
      >
        {loading ? "Processing..." : `Pay $${getTotal().toFixed(2)}`}
      </button>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}
