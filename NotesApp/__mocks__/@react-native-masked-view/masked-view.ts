import React from 'react';
import { View } from 'react-native';

module.exports = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(View, null, children);
