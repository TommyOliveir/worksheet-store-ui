import { post } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";

export function loginMutationOptions() {
  return {
    mutationFn: (payload: LoginPayload) =>
      post<AuthResponse, LoginPayload>(ENDPOINTS.auth.login, payload, {
        requiresAuth: false,
      }),
  };
}

export function registerMutationOptions() {
  return {
    // Role isn't sent: the API assigns BUYER itself. It used to be a field on
    // the request, which meant the "buyer only" rule lived in the browser and
    // a plain curl could ask for ADMIN.
    mutationFn: (payload: RegisterPayload) =>
      post<AuthResponse, RegisterPayload>(ENDPOINTS.auth.register, payload, {
        requiresAuth: false,
      }),
  };
}

export function logoutMutationOptions() {
  return {
    // The server clears the httpOnly cookies on its response; the browser
    // can't remove them itself.
    mutationFn: () =>
      post<void, undefined>(ENDPOINTS.auth.logout, undefined, {
        skipAuthRedirect: true,
      }),
  };
}
