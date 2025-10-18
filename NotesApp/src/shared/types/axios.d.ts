// src/types/axios.d.ts
import 'axios';

declare module 'axios' {
  // add a private retry flag to the request config
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
