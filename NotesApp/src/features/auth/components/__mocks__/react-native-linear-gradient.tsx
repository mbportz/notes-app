// __mocks__/react-native-linear-gradient.ts
import React from 'react';
import { View } from 'react-native';
import type { AppBrandProps } from '../AppBrand';

type LinearGradientProps = React.PropsWithChildren<Pick<AppBrandProps, 'colors' | 'start' | 'end'>>;

export default function MockLinearGradient({ children, ...props }: LinearGradientProps) {
  return (
    <View testID="linear-gradient" {...props}>
      {children}
    </View>
  );
}
