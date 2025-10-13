import React from 'react';
import { render, screen } from '@testing-library/react-native';
import GradientButton from '../GradientButton';

jest.mock('react-native-linear-gradient');

test('renders a button with title and gradient props', () => {
  render(<GradientButton title="Continue" />);

  // Button role (use getByRole for newer RNTL)
  expect(screen.getByRole('button')).toBeTruthy();

  // Title text
  expect(screen.getByText('Continue')).toBeTruthy();

  // Assert gradient props via our manual mock
  const gradient = screen.getByTestId('linear-gradient');
  const p = gradient.props;

  expect(p.colors).toEqual(['#853ced', '#d046ee']);
  expect(p.start).toEqual({ x: 0, y: 0 });
  expect(p.end).toEqual({ x: 1, y: 0 });
  expect(p.className).toBe('absolute inset-0');
});
