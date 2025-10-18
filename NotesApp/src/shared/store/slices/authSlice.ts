import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = { isAuthenticated: boolean };
const initialState: AuthState = { isAuthenticated: false };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (s, a: PayloadAction<boolean>) => {
      s.isAuthenticated = a.payload;
    },
    resetAuth: (s) => {
      s.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, resetAuth } = slice.actions;
export default slice.reducer;
