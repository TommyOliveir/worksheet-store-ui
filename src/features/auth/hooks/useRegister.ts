"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { registerMutationOptions } from "../queries/authQueries";

export function useRegister() {
  const { setSession } = useAuth();

  const mutation = useMutation({
    ...registerMutationOptions(),
    onSuccess: (session) => {
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
