// __tests__/App.test.tsx
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', () => {
  const tree = ReactTestRenderer.create(<App />).toJSON();
  expect(tree).toBeTruthy(); // ✅ at least one assertion
});
