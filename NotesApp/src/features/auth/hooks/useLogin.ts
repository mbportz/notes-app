// src/features/auth/hooks.ts
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { login, type LoginPayload } from '@shared/api/auth';
import { HttpError } from '@shared/api/HttpError';
import { setAuthenticated } from '@shared/store/slices/authSlice';
import { useToast } from '@shared/ui';

export default function useLogin() {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (p: LoginPayload) => login(p),
    onSuccess: () => {
      dispatch(setAuthenticated(true));
      showToast({ type: 'success', message: 'Signed in successfully' });
    },
    onError: (err: unknown) => {
      const message = err instanceof HttpError ? err.message : 'Unable to sign in';
      showToast({ type: 'error', message });
    },
  });
}
