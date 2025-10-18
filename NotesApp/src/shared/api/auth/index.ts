import { http } from '@shared/api/http';
import { saveTokens, clearTokens, getRefreshToken } from '@shared/api/tokenStorage';

type AuthUser = {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

type TokenBundle = {
  token: string;
  refresh_token: string;
  refresh_expires_at: string;
};

export type LoginPayload = { email: string; password: string };
export type LoginResponse = { user: AuthUser } & TokenBundle;

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export type RegisterResponse = { user: AuthUser } & TokenBundle;

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>('/auth/login', payload);
  await saveTokens(data.token, data.refresh_token, data.refresh_expires_at);
  return data;
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const { data } = await http.post<RegisterResponse>('/auth/register', payload);
  await saveTokens(data.token, data.refresh_token, data.refresh_expires_at);
  return data;
}

export async function logout(): Promise<void> {
  try {
    await http.post('/auth/logout');
  } catch {}
  await clearTokens();
}

export type Profile = { id: string; name: string; email: string };
export async function getProfile(): Promise<Profile> {
  const { data } = await http.get('/me');
  return data;
}

export type RefreshResponse = {
  token: string;
  refresh_token?: string; // some APIs rotate refresh token; optional
  refresh_expires_at?: string;
};

/** Exchanges refresh_token for a new access token (and maybe a new refresh token). */
export async function refreshTokens(): Promise<RefreshResponse> {
  const refresh_token = await getRefreshToken();
  if (!refresh_token) throw new Error('No refresh token');

  const { data } = await http.post<RefreshResponse>('/auth/refresh', { refresh_token });
  await saveTokens(data.token, data.refresh_token, data.refresh_expires_at);
  return data;
}
