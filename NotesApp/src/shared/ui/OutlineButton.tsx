import React from 'react';
import { Pressable, Text, View } from 'react-native';

type OutlineButtonProps = {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string;
};

export default function OutlineButton({
  title,
  onPress,
  icon,
  className,
  textClassName,
}: OutlineButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`flex-row items-center justify-center gap-2 rounded-2xl border border-line-300 bg-white px-4 py-2 ${className ?? ''}`}
    >
      {icon ? <View>{icon}</View> : null}
      <Text className={`text-md font-semibold text-text ${textClassName ?? ''}`}>{title}</Text>
    </Pressable>
  );
}
