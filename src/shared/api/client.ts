import { API_BASE_URL } from "./config";
import { refreshSession } from "./refresh";
import { notifyUnauthorized } from "./session-events";

type RequestOptions = RequestInit & {
  // False for calls made without a session (login, register), whose 401
  // means bad credentials and must not trigger a token refresh.
  requiresAuth?: boolean;
  // Set on calls that handle their own 401. Logout is the case: a session the
  // server has already dropped answers 401, and that is a finished logout
  // rather than a session to react to.
  skipAuthRedirect?: boolean;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message = "Request failed",
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function normalizeErrorMessage(message: unknown): string {
  if (Array.isArray(message)) {
    return message.join(", ");
  }

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  return "Request failed";
}

// The API's exception filter nests the original error under `error`,
// whose `message` is a string for thrown exceptions and an array for
// validation failures.
function extractErrorMessage(body: unknown): string {
  if (!body || typeof body !== "object") {
    return "Request failed";
  }

  const { error } = body as { error?: unknown };

  if (error && typeof error === "object") {
    return normalizeErrorMessage((error as { message?: unknown }).message);
  }

  return normalizeErrorMessage(error);
}

async function request<T>(url: string, options?: RequestOptions): Promise<T> {
  const { requiresAuth, skipAuthRedirect, ...init } = options ?? {};
  const headers = new Headers(init.headers);

  if (
    init.body &&
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  // The session is carried by httpOnly cookies, which the browser attaches
  // itself; this code never sees the tokens.
  const send = () =>
    fetch(`${API_BASE_URL}${url}`, {
      ...init,
      headers,
      credentials: "include",
    });

  let response = await send();

  // The access token lives for minutes, so a 401 usually just means it
  // expired. Refresh once and retry before concluding anything.
  if (
    response.status === 401 &&
    requiresAuth !== false &&
    (await refreshSession())
  ) {
    response = await send();
  }

  if (!response.ok) {
    const errorBody: unknown = await response.json().catch(() => null);

    // Still 401 after a refresh: the session is gone server-side — revoked
    // from elsewhere, or lapsed. Skipped when the call sent no credentials,
    // so a wrong password on the login form isn't mistaken for a lost
    // session and doesn't bounce the user off the page.
    if (
      response.status === 401 &&
      requiresAuth !== false &&
      !skipAuthRedirect
    ) {
      notifyUnauthorized();
    }

    throw new ApiError(response.status, extractErrorMessage(errorBody));
  }

  const text = await response.text();

  if (!text) {
    return null as T;
  }

  return JSON.parse(text) as T;
}

export function get<T>(url: string, options?: RequestOptions): Promise<T> {
  return request<T>(url, {
    method: "GET",
    ...options,
  });
}

export function post<TResponse, TBody>(
  url: string,
  body: TBody,
  options?: RequestOptions,
): Promise<TResponse> {
  return request<TResponse>(url, {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
}
