// src/features/auth/hooks.ts
import { useQuery } from '@tanstack/react-query';
import { getProfile, type Profile } from '@shared/api/auth';

export default function useProfile(enabled = true) {
  return useQuery<Profile>({ queryKey: ['me'], queryFn: getProfile, enabled });
}
