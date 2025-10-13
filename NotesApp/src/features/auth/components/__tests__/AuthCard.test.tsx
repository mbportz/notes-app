import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import AuthCard from '../AuthCard';

describe('AuthCard', () => {
  it('renders children', () => {
    const { getByText, toJSON } = render(
      <AuthCard>
        <Text>Hello</Text>
      </AuthCard>,
    );
    expect(getByText('Hello')).toBeTruthy();
    expect(toJSON()).toBeTruthy(); // container exists
  });

  it('supports custom pad/gap/className without crashing', () => {
    const { getByText, toJSON } = render(
      <AuthCard pad="lg" gap="sm" className="bg-red-500">
        <Text>Content</Text>
      </AuthCard>,
    );
    expect(getByText('Content')).toBeTruthy();
    expect(toJSON()).toBeTruthy();
  });

  it('uses defaults when props are omitted', () => {
    const { getByText } = render(
      <AuthCard>
        <Text>Default Props</Text>
      </AuthCard>,
    );
    expect(getByText('Default Props')).toBeTruthy();
  });
});
