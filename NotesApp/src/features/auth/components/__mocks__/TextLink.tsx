import React from 'react';
import { Text } from 'react-native';

type Props = {
  linkTitle: string;
  onPress?: () => void;
  textClassName?: string;
};

export default function MockTextLink({ linkTitle, onPress }: Props) {
  return (
    <Text accessibilityRole="button" onPress={onPress} testID={`textlink-${linkTitle}`}>
      {linkTitle}
    </Text>
  );
}
