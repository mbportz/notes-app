import React from 'react';
import { Text } from 'react-native';

type FieldErrorProps = {
  message?: string | null;
  className?: string | null;
};

export default function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null;
  return (
    <Text className={`text-sm font-medium text-feedback-error my-0 py-0${className}`}>
      {message}
    </Text>
  );
}
