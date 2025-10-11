import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

type TextLinkProps = {
  linkTitle: string;
  containerClassName?: string;
  textClassName?: string;
  onPress?: () => void;
};

const TextLink = ({ linkTitle, containerClassName, textClassName, onPress }: TextLinkProps) => {
  return (
    <TouchableOpacity className={`${containerClassName}`} onPress={onPress}>
      <Text className={`font-bold text-body color-primary ${textClassName} `}>{linkTitle}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;
