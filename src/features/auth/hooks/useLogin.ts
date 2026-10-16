"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { loginMutationOptions } from "../queries/authQueries";

export function useLogin() {
  const { setSession } = useAuth();

  const mutation = useMutation({
    ...loginMutationOptions(),
    onSuccess: (session) => {
      setSession(session);
    },
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    isLoggingIn: mutation.isPending,
    loginError: mutation.error,
    ...mutation,
  };
}
