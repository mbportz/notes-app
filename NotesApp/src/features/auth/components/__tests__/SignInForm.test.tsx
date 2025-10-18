import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SignInForm from '../SignInForm';

const mutateMock = jest.fn();
let mockIsPending = false;
let mockError: unknown;

jest.mock('../../hooks', () => ({
  useLogin: () => ({
    mutate: mutateMock,
    isPending: mockIsPending,
    error: mockError,
  }),
}));

describe('SignInForm', () => {
  beforeEach(() => {
    mutateMock.mockReset();
    mockIsPending = false;
    mockError = undefined;
  });

  const renderForm = () => render(<SignInForm footer={{ variantAction: jest.fn() }} />);

  it('validates required fields before submitting', () => {
    const { getByRole, getByText } = renderForm();

    fireEvent.press(getByRole('button', { name: /sign in/i }));

    expect(getByText('Enter a valid email.')).toBeTruthy();
    expect(getByText('Password is required.')).toBeTruthy();
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it('submits trimmed credentials when valid', () => {
    const { getByPlaceholderText, getByRole } = renderForm();

    fireEvent.changeText(getByPlaceholderText('Enter your email'), ' test@example.com ');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), ' secret ');

    fireEvent.press(getByRole('button', { name: /sign in/i }));

    expect(mutateMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: ' secret ', // password remains as entered; trimming not enforced to preserve spaces
    });
  });

  it('does not submit while mutation is pending', () => {
    mockIsPending = true;
    const { getByPlaceholderText, getByRole } = renderForm();

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'secret');

    fireEvent.press(getByRole('button', { name: /signing in/i }));

    expect(mutateMock).not.toHaveBeenCalled();
  });
});
