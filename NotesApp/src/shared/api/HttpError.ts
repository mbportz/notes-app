// src/shared/api/HttpError.ts
export interface ApiErrorBody {
  message?: string;
  [key: string]: unknown;
}

export class HttpError extends Error {
  readonly status: number;
  readonly details?: ApiErrorBody;

  constructor(status: number, message: string, details?: ApiErrorBody) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}
