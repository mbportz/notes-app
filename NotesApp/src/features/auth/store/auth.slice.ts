import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = { token: string | null; loading: boolean };
const initialState: AuthState = { token: null, loading: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    signOut(state) {
      state.token = null;
    },
  },
});

export const { setToken, setLoading, signOut } = authSlice.actions;
export default authSlice.reducer;
