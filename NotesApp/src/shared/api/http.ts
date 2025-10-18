// src/shared/api/http.ts
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import Config from 'react-native-config';
import { getAccessToken, clearTokens } from '@shared/api/tokenStorage';
import { refreshTokens } from '@shared/api/auth';
import { HttpError, ApiErrorBody } from './HttpError';
import { setAuthHeader } from './setAuthHeaders';
const API_BASE_URL = Config.API_BASE_URL ?? 'http://10.0.2.2:3000';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

// Attach access token (typed)
http.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) setAuthHeader(config, token);
  return config;
});

// ---- Refresh with queue (typed, no any) ----
type PendingRequest = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let pendingQueue: PendingRequest[] = [];

function drainQueue(error: unknown, token?: string) {
  for (const { resolve, reject, config } of pendingQueue) {
    if (token) {
      setAuthHeader(config, token);
      resolve(http(config));
    } else {
      reject(error);
    }
  }
  pendingQueue = [];
}

http.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<ApiErrorBody>): Promise<never> => {
    const status = err.response?.status ?? 0;
    const original: InternalAxiosRequestConfig & { _retry?: boolean } =
      (err.config as InternalAxiosRequestConfig) ??
      ({ _retry: false } as InternalAxiosRequestConfig);

    if ((status === 401 || status === 403) && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        try {
          isRefreshing = true;
          const data = await refreshTokens(); // stores new tokens
          isRefreshing = false;

          drainQueue(undefined, data.token); // release queued

          setAuthHeader(original, data.token);
          return http(original) as never;
        } catch (refreshErr) {
          isRefreshing = false;
          drainQueue(refreshErr, undefined);
          await clearTokens();
          const message = refreshErr instanceof Error ? refreshErr.message : 'Refresh failed';
          throw new HttpError(401, message);
        }
      }

      // queue while refresh is in-flight
      return new Promise<unknown>((resolve, reject) => {
        pendingQueue.push({ resolve, reject, config: original });
      }) as never;
    }

    // Normalize all other errors
    const message = err.response?.data?.message ?? err.message ?? 'Something went wrong';
    throw new HttpError(status, message, err.response?.data);
  },
);
