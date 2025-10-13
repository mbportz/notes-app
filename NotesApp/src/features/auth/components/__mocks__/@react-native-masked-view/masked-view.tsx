// __mocks__/SomeComponent.tsx
import React from 'react';
import { View } from 'react-native';

export default function MockComponent({ children }: { children?: React.ReactNode }) {
  return <View>{children}</View>;
}
