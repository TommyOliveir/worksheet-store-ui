import { post } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UserRole,
} from "@/features/auth/types/auth.types";

// Storefront signup is buyer-only: role is never taken from user input,
// otherwise anyone could self-register as ADMIN.
const SIGNUP_ROLE: UserRole = "BUYER";

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
    mutationFn: (payload: RegisterPayload) =>
      post<AuthResponse, RegisterPayload & { role: UserRole }>(
        ENDPOINTS.auth.register,
        { ...payload, role: SIGNUP_ROLE },
        { requiresAuth: false },
      ),
  };
}
