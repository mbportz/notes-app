// src/features/auth/components/AuthFooterLinks.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextLink } from '@shared/ui';
import { ArrowLeft } from 'lucide-react-native';
import Color from '@shared/theme/colors.json';

type Align = 'left' | 'center' | 'right';
type Gap = 'sm' | 'md' | 'lg';

const ALIGN: Record<Align, string> = {
  left: 'items-start',
  center: 'items-center',
  right: 'items-end',
};

const GAP: Record<Gap, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-5',
};

type RowLink = {
  label?: string; // default provided if omitted
  onPress: () => void;
};

type PromptRow = {
  text: string; // e.g., "Don't have an account?"
  actionLabel: string; // e.g., "Sign up"
  onPress: () => void;
};

type BaseProps = {
  /** Show a single "Forgot password?" row (optional) */
  forgot?: RowLink;

  /** Second row with text + link; you can pass your own copy */
  prompt?: PromptRow;

  /**
   * Convenience: auto supply prompt copy.
   * - 'signin' => "Don't have an account?" + "Sign up"
   * - 'signup' => "Already have an account?" + "Sign in"
   */

  /** Required if you use variant without passing prompt */
  variantAction?: () => void;

  align?: Align; // default center
  gap?: Gap; // vertical spacing between rows
  className?: string; // extra classes for the container
};

type ForgotPasswordVariant = BaseProps & {
  variant: 'forgot-password';
  variantActions: () => void;
};

type AuthVariant = BaseProps & {
  variant?: 'signin' | 'signup' | undefined;
  variantAction?: () => void;
};

export type AuthFooterLinksProps = ForgotPasswordVariant | AuthVariant;

const AuthFooterLinks = ({
  forgot,
  prompt,
  variant,
  variantAction,
  align = 'center',
  gap = 'lg',
  className = '',
}: AuthFooterLinksProps) => {
  // If no custom prompt passed, build one from variant
  let computedPrompt = prompt;
  if (!computedPrompt && variant !== 'forgot-password' && variantAction) {
    computedPrompt =
      variant === 'signin'
        ? { text: "Don't have an account?", actionLabel: 'Sign up', onPress: variantAction }
        : { text: 'Already have an account?', actionLabel: 'Sign in', onPress: variantAction };
  }

  return (
    <View className={`w-full ${ALIGN[align]} justify-center ${GAP[gap]} ${className}`}>
      {forgot && (
        <TextLink
          linkTitle={forgot.label ?? 'Forgot password?'}
          textClassName="font-medium"
          onPress={forgot.onPress}
        />
      )}

      {computedPrompt && (
        <View className="flex-row items-center gap-2">
          <Text className="font-medium text-body text-text-muted">{computedPrompt.text}</Text>
          <TextLink linkTitle={computedPrompt.actionLabel} onPress={computedPrompt.onPress} />
        </View>
      )}

      {variant === 'forgot-password' && (
        <Pressable
          onPress={variantAction}
          accessibilityRole="link"
          accessibilityLabel="Back to Login"
          accessibilityHint="Returns to the sign-in screen"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {({ pressed }) => (
            <View className="flex-row items-center gap-2">
              {/* <Ionicons name="home" color={pressed ? '#853ced' : '#6B7280'} size={24} /> */}
              <ArrowLeft
                color={pressed ? Color.primary.DEFAULT : Color.text.muted}
                size={20}
                strokeWidth={2}
              />
              <Text
                className={`font-semibold text-md ${pressed ? 'text-primary-600' : 'text-text-muted'}`}
              >
                Back to Login
              </Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default AuthFooterLinks;
