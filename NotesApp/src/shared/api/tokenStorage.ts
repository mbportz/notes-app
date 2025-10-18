import AsyncStorage from '@react-native-async-storage/async-storage';

const token = {
  ACCESS: 'auth_token',
  REFRESH: 'refresh_token',
  REFRESH_EXP: 'refresh_expires_at',
};

export async function saveTokens(access: string, refresh?: string, refreshExpISO?: string) {
  const ops = [AsyncStorage.setItem(token.ACCESS, access)];
  if (refresh) ops.push(AsyncStorage.setItem(token.REFRESH, refresh));
  if (refreshExpISO) ops.push(AsyncStorage.setItem(token.REFRESH_EXP, refreshExpISO));
  await Promise.all(ops);
}

export async function getAccessToken() {
  return AsyncStorage.getItem(token.ACCESS);
}

export async function getRefreshToken() {
  return AsyncStorage.getItem(token.REFRESH);
}

export async function getRefreshExpiry() {
  return AsyncStorage.getItem(token.REFRESH_EXP);
}

export async function clearTokens() {
  await Promise.all([
    AsyncStorage.removeItem(token.ACCESS),
    AsyncStorage.removeItem(token.REFRESH),
    AsyncStorage.removeItem(token.REFRESH_EXP),
  ]);
}
