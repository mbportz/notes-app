// src/features/auth/hooks.ts

import { useDispatch } from 'react-redux';
import { logout as logoutApi } from '@shared/api/auth';
import { resetAuth } from '@shared/store/slices/authSlice';
import { useToast } from '@shared/ui';

export default function useLogout() {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  return {
    logout: async () => {
      await logoutApi();
      dispatch(resetAuth());
      showToast({ type: 'info', message: 'Signed out' });
    },
  };
}
