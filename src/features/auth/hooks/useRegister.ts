"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { registerMutationOptions } from "../queries/authQueries";

export function useRegister() {
  const { setSession } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...registerMutationOptions(),
    onSuccess: (session) => {
      queryClient.clear();
      setSession(session);
    },
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    isRegistering: mutation.isPending,
    registerError: mutation.error,
    ...mutation,
  };
}
