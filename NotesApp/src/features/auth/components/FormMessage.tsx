import { View, Text } from 'react-native';
import React from 'react';

type FormMessage = {
  title?: string;
  subtitle?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const FormMessage = ({
  title = 'title',
  subtitle = 'subtitle',
  containerClassName,
  titleClassName,
  subtitleClassName,
}: FormMessage) => {
  return (
    <View className={`w-full gap-5 items-center justify-center ${containerClassName}`}>
      <Text className={`text-h1 font-extrabold ${titleClassName} text-center`}>{title}</Text>
      <Text
        className={`text-label font-medium text-text-muted text-center justify-center${subtitleClassName}`}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default FormMessage;
