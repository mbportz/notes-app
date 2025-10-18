import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { register, type RegisterPayload } from '@shared/api/auth';
import { HttpError } from '@shared/api/HttpError';
import { setAuthenticated } from '@shared/store/slices/authSlice';
import { useToast } from '@shared/ui';

export default function useRegister() {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: () => {
      dispatch(setAuthenticated(true));
      showToast({ type: 'success', message: 'Account created successfully' });
    },
    onError: (err: unknown) => {
      const message = err instanceof HttpError ? err.message : 'Unable to create account';
      showToast({ type: 'error', message });
    },
  });
}
