import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

type TexFieldProps = TextInputProps & {
  label?: 'string';
};

const TextField = ({ label }: TexFieldProps) => {
  return (
    <View>
      <Text className={`mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300`}>
        {label}
      </Text>
      <TextInput placeholder="test" />
    </View>
  );
};

export default TextField;
