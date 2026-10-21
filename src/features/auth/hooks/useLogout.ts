"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { logoutMutationOptions } from "../queries/authQueries";
import { useCartStore } from "@/store/useCartStore";

export function useLogout() {
  const { logout: clearLocalSession } = useAuth();
  const queryClient = useQueryClient();
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const mutation = useMutation({
    ...logoutMutationOptions(),
    // onSettled, not onSuccess. The server revoking the session is what ends
    // it, but if that request never lands we still clear this browser rather
    // than strand someone in a signed-in UI they can't sign out of.
    onSettled: () => {
      clearLocalSession();
      clearCart();
      // Anything fetched for the old user is dropped, so the next person to
      // log in on this browser can't be served their data from cache.
      queryClient.clear();
      router.replace("/");
    },
  });

  return {
    logout: mutation.mutate,
    isLoggingOut: mutation.isPending,
  };
}
