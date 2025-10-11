// Keep everything inside the factory via require()
import React from 'react';
import { View } from 'react-native';
import { AppBrandProps } from '../src/features/auth/components/AppBrand';

type LinearGradientProps = React.PropsWithChildren<Pick<AppBrandProps, 'colors' | 'start' | 'end'>>;

module.exports = ({ children, ...props }: LinearGradientProps) => {
  return React.createElement(View, { testID: 'linear-gradient', ...props }, children);
};
