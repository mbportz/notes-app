import React from 'react';
import { View } from 'react-native';

type Pad = 'xs' | 'sm' | 'md' | 'lg';
type Gap = 'xs' | 'sm' | 'md' | 'lg';

const PAD_X: Record<Pad, string> = { xs: 'px-3', sm: 'px-5', md: 'px-7', lg: 'px-9' };
const PAD_Y: Record<Pad, string> = { xs: 'py-4', sm: 'py-6', md: 'py-8', lg: 'py-10' };
const GAP_Y: Record<Gap, string> = { xs: 'gap-y-3', sm: 'gap-y-5', md: 'gap-y-7', lg: 'gap-y-10' };

export type AuthCardProps = React.PropsWithChildren<{
  pad?: Pad; // spacing token (both axes)
  gap?: Gap; // vertical gap between children
  className?: string;
}>;

export default function AuthCard({
  children,
  pad = 'md',
  gap = 'md',
  className = '',
}: AuthCardProps) {
  const base = 'w-full rounded-2xl border-2 border-line-300 bg-white dark:bg-neutral-900';
  return (
    <View className={`${base} ${PAD_X[pad]} ${PAD_Y[pad]} ${GAP_Y[gap]} ${className}`}>
      {children}
    </View>
  );
}
