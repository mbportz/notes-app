import React from 'react';
import { Pressable, Text, View } from 'react-native';

type OutlineButtonProps = {
  title?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export default function OutlineButton({
  title,
  onPress,
  icon,
  className,
  textClassName,
  accessibilityLabel,
  accessibilityHint,
}: OutlineButtonProps) {
  const hasTitle = typeof title === 'string' ? title.trim().length > 0 : Boolean(title);
  const hasIcon = Boolean(icon);
  const contentGap = hasTitle && hasIcon ? 'gap-2' : '';
  const label = accessibilityLabel ?? (hasTitle ? String(title).trim() : undefined);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label ?? 'button'}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-2xl border border-line-300 bg-white px-4 py-2 ${contentGap} ${className ?? ''}`}
    >
      {hasIcon ? <View className="items-center justify-center">{icon}</View> : null}
      {hasTitle ? (
        <Text className={`text-md font-semibold text-text ${textClassName ?? ''}`}>{title}</Text>
      ) : null}
    </Pressable>
  );
}
