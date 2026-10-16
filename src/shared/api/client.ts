import { getStoredToken } from "@/features/auth/tokenStore";
import { API_BASE_URL } from "./config";

type RequestOptions = RequestInit & {
  requiresAuth?: boolean;
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
  const headers = new Headers(options?.headers);

  if (
    options?.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (options?.requiresAuth !== false) {
    const accessToken = getStoredToken();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody: unknown = await response.json().catch(() => null);
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
