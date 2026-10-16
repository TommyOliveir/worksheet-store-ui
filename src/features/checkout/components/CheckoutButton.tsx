"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { apiClient } from "@/shared/lib/api-client";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";

export default function CheckoutButton() {
  const { cart, getTotal } = useCartStore();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent("/worksheets")}`);
      return;
    }

    try {
      setLoading(true);
      const worksheetIds = cart.map((item) => item.id);

      const response = await apiClient.post("/orders/checkout", {
        worksheetIds,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to initiate checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={cart.length === 0 || loading}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 transition"
    >
      {loading ? "Processing..." : `Pay $${getTotal().toFixed(2)}`}
    </button>
  );
}
