import axios from "axios";
import { getStoredToken } from "@/features/auth/tokenStore";
import { notifyUnauthorized } from "@/shared/api/session-events";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Every call made through this client is authenticated, so a 401 can only
// mean the session no longer exists on the server. Hand it to the app to
// clear rather than surfacing it as an ordinary request failure.
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      notifyUnauthorized();
    }
    return Promise.reject(error);
  },
);
