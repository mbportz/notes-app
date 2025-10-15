// src/components/layout/Screen.tsx
import React from 'react';
import { View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Pad = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Gap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const PAD_X: Record<Pad, string> = { xs: 'px-3', sm: 'px-5', md: 'px-7', lg: 'px-9', xl: 'px-11' };
const PAD_Y: Record<Pad, string> = { xs: 'py-4', sm: 'py-6', md: 'py-8', lg: 'py-10', xl: 'py-7' };
const GAP_Y: Record<Gap, string> = {
  xs: 'gap-y-2',
  sm: 'gap-y-5',
  md: 'gap-y-7',
  lg: 'gap-y-9',
  xl: 'gap-y-11',
};

export type ScreenProps = React.PropsWithChildren<{
  scroll?: boolean;
  pad?: Pad; // ← choose a token
  gap?: Gap;
  maxWidthPx?: number; // you can still keep this class-based
}>;

export default function Screen({
  children,
  scroll = false,
  pad = 'md',
  gap = 'md',
  maxWidthPx,
}: ScreenProps) {
  const Container = scroll ? ScrollView : View;

  const paddingCls = `${PAD_X[pad]} ${PAD_Y[pad]}`;
  const gapCls = GAP_Y[gap];

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Container
          className={`flex-1 ${!scroll ? paddingCls : ''}`}
          contentContainerClassName={scroll ? `${paddingCls} ${gapCls}` : undefined}
        >
          <View className={`${gapCls} ${maxWidthPx ? 'items-center' : ''}`}>
            {maxWidthPx ? (
              <View className={`w-full max-w-[${maxWidthPx}px]`}>{children}</View>
            ) : (
              children
            )}
          </View>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
