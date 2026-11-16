"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { googleLoginMutationOptions } from "../queries/authQueries";

// Named apart from @react-oauth/google's own `useGoogleLogin`.
export function useGoogleSignIn() {
  const { setSession } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...googleLoginMutationOptions(),
    onSuccess: (session) => {
      // As in useLogin: nothing cached for a previous user may leak through.
      queryClient.clear();
      setSession(session);
    },
  });

  return {
    signInWithGoogle: mutation.mutate,
    isSigningIn: mutation.isPending,
    signInError: mutation.error,
  };
}
