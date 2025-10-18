import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SignUpForm from '../SignUpForm';

const mockMutate = jest.fn();
let mockIsPending = false;

jest.mock('../../hooks', () => ({
  useRegister: () => ({
    mutate: mockMutate,
    isPending: mockIsPending,
  }),
}));

describe('SignUpForm', () => {
  beforeEach(() => {
    mockMutate.mockReset();
    mockIsPending = false;
  });

  const renderForm = () => render(<SignUpForm footer={{ variantAction: jest.fn() }} />);

  it('validates required fields with zod schema', () => {
    const { getByPlaceholderText, getAllByPlaceholderText, getByRole, getByText } = renderForm();

    fireEvent.changeText(getByPlaceholderText('Enter username'), 'Example');
    const [passwordField, confirmField] = getAllByPlaceholderText('Enter your password');
    fireEvent.changeText(passwordField, 'secret');
    fireEvent.changeText(confirmField, 'secret');

    fireEvent.press(getByRole('button', { name: /create account/i }));

    expect(getByText('Enter a valid email.')).toBeTruthy();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('validates passwords and submits trimmed payload', () => {
    const { getByPlaceholderText, getAllByPlaceholderText, getByRole, getByText, queryByText } =
      renderForm();

    fireEvent.changeText(getByPlaceholderText('Enter username'), ' Example ');
    fireEvent.changeText(getByPlaceholderText('Enter your email'), ' test@example.com ');

    const [passwordField, confirmField] = getAllByPlaceholderText('Enter your password');
    fireEvent.changeText(passwordField, 'secret');
    fireEvent.changeText(confirmField, 'mismatch');

    fireEvent.press(getByRole('button', { name: /create account/i }));

    expect(getByText('Passwords do not match.')).toBeTruthy();
    expect(mockMutate).not.toHaveBeenCalled();
    mockMutate.mockClear();

    fireEvent.changeText(confirmField, 'secret');
    expect(queryByText('Passwords do not match.')).toBeNull();

    fireEvent.press(getByRole('button', { name: /create account/i }));

    expect(mockMutate).toHaveBeenCalledWith({
      username: 'Example',
      email: 'test@example.com',
      password: 'secret',
      password_confirmation: 'secret',
    });
  });

  it('does not submit while a registration is pending', () => {
    mockIsPending = true;
    const { getByPlaceholderText, getAllByPlaceholderText, getByRole } = renderForm();

    fireEvent.changeText(getByPlaceholderText('Enter username'), 'Example');
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    const [passwordField, confirmField] = getAllByPlaceholderText('Enter your password');
    fireEvent.changeText(passwordField, 'secret');
    fireEvent.changeText(confirmField, 'secret');

    const submitButton = getByRole('button', { name: /creating account/i });
    fireEvent.press(submitButton);

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
