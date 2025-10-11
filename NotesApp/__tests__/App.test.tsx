import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

test('renders hello text', () => {
  const { getByText } = render(<Text>Hello Jest!</Text>);
  expect(getByText('Hello Jest!')).toBeTruthy();
});
