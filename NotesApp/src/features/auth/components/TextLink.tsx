import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

type TextLinkProps = {
  linkTitle: string;
  containerClassName?: string;
  textClassName?: string;
  onPress?: () => void;
  accessibilityRole?: 'link' | 'button';
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
};

const TextLink = ({
  linkTitle,
  containerClassName,
  textClassName,
  accessibilityRole,
  accessibilityLabel,
  disabled,
  accessibilityHint,
  onPress,
}: TextLinkProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      className={`${containerClassName}`}
      onPress={onPress}
    >
      <Text className={`font-bold text-body color-primary ${textClassName} `}>{linkTitle}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;
