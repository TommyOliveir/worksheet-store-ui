"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { loginMutationOptions } from "../queries/authQueries";

export function useLogin() {
  const { setSession } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...loginMutationOptions(),
    onSuccess: (session) => {
      // Clear before storing the new session: anything cached under the
      // previous user must not be served to this one.
      queryClient.clear();
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
