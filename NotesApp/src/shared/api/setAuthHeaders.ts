// src/shared/api/setAuthHeader.ts
import type { AxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';

export function setAuthHeader(config: AxiosRequestConfig, token: string): void {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }
  if (config.headers instanceof AxiosHeaders) {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    // Raw header bag case
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
}
