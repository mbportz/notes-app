import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from '@shared/theme/colors.json';

type GradientButtonProps = {
  title?: string;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

const GradientButton = ({
  title,
  onPress,
  className,
  textClassName,
  leftIcon,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}: GradientButtonProps) => {
  const defaultSizing = 'w-full h-[50px]';
  const sizing = className ? className : defaultSizing;
  const hasIcon = Boolean(leftIcon);
  const hasTitle = typeof title === 'string' ? title.trim().length > 0 : Boolean(title);
  const contentGap = hasIcon && hasTitle ? 'gap-2' : '';
  const a11yLabel = accessibilityLabel ?? (hasTitle ? String(title).trim() : undefined) ?? 'button';
  return (
    <TouchableOpacity
      className={`rounded-xl overflow-hidden ${sizing} ${disabled ? 'opacity-60' : ''}`}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
      onPress={onPress}
    >
      <LinearGradient
        colors={[Color.primary.DEFAULT, Color.secondary.DEFAULT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="absolute inset-0"
      >
        <View className={`h-full flex-row items-center justify-center px-5 ${contentGap}`}>
          {hasIcon ? <View className="items-center justify-center">{leftIcon}</View> : null}
          {hasTitle ? (
            <Text className={`text-md font-bold text-neutral-100 ${textClassName ?? ''}`}>
              {title}
            </Text>
          ) : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
