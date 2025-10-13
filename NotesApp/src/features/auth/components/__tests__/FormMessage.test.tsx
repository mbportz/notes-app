import React from 'react';
import { render } from '@testing-library/react-native';
import FormMessage from '../FormMessage';

describe('FormMessage', () => {
  it('renders default title and subtitle', () => {
    const { getByText } = render(<FormMessage />);
    expect(getByText('title')).toBeTruthy();
    expect(getByText('subtitle')).toBeTruthy();
  });

  it('renders custom title and subtitle', () => {
    const { getByText, queryByText } = render(
      <FormMessage title="Welcome back" subtitle="Please sign in to continue" />,
    );
    expect(getByText('Welcome back')).toBeTruthy();
    expect(getByText('Please sign in to continue')).toBeTruthy();

    // Ensure defaults are not shown
    expect(queryByText('title')).toBeNull();
    expect(queryByText('subtitle')).toBeNull();
  });

  it('accepts className props without crashing', () => {
    const { toJSON } = render(
      <FormMessage
        title="Hello"
        subtitle="World"
        containerClassName="bg-red-500"
        titleClassName="text-blue-500"
        subtitleClassName="italic"
      />,
    );
    // Component rendered successfully
    expect(toJSON()).toBeTruthy();
  });
});
