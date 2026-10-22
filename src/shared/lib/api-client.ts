import axios, { InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/shared/api/config";
import { refreshSession } from "@/shared/api/refresh";
import { notifyUnauthorized } from "@/shared/api/session-events";

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // Sends the httpOnly session cookies cross-origin to the API.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Every call made through this client is authenticated. A 401 first gets one
// refresh and retry, since the access token is short-lived; a 401 after that
// means the session no longer exists on the server, which is handed to the
// app to clear rather than surfaced as an ordinary request failure.
apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const config = error.config as RetriableConfig | undefined;

    if (config && !config._retried && (await refreshSession())) {
      config._retried = true;
      return apiClient.request(config);
    }

    notifyUnauthorized();
    return Promise.reject(error);
  },
);
