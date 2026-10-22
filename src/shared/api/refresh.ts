import { API_BASE_URL } from "./config";
import { ENDPOINTS } from "./endpoints";

let inFlight: Promise<boolean> | null = null;

/**
 * Trades the refresh-token cookie for a new pair of cookies.
 *
 * Shared by every caller: requests that fail together wait on one refresh
 * rather than each sending their own, which the server would see as the same
 * refresh token being reused.
 *
 * Resolves true when the original request is worth retrying. A 409 counts:
 * another tab refreshed first and its new cookies are already in the browser.
 */
export function refreshSession(): Promise<boolean> {
  inFlight ??= fetch(`${API_BASE_URL}${ENDPOINTS.auth.refresh}`, {
    method: "POST",
    credentials: "include",
  })
    .then(
      (response) => response.ok || response.status === 409,
      () => false,
    )
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}
