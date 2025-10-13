import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthFooterLinks from '../AuthFooterLinks';

jest.mock('../TextLink');

describe('AuthFooterLinks', () => {
  it('renders a "Forgot password?" link with default label and handles press', () => {
    const onForgot = jest.fn();
    const { getByText } = render(<AuthFooterLinks forgot={{ onPress: onForgot }} />);
    const forgot = getByText('Forgot password?');
    expect(forgot).toBeTruthy();

    fireEvent.press(forgot);
    expect(onForgot).toHaveBeenCalledTimes(1);
  });

  it('renders a custom forgot label when provided', () => {
    const onForgot = jest.fn();
    const { getByText, queryByText } = render(
      <AuthFooterLinks forgot={{ label: 'Reset password', onPress: onForgot }} />,
    );

    expect(getByText('Reset password')).toBeTruthy();
    expect(queryByText('Forgot password?')).toBeNull();
  });

  it('renders custom prompt row and handles action press', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <AuthFooterLinks
        prompt={{ text: "Don't have access?", actionLabel: 'Request access', onPress: onAction }}
      />,
    );

    expect(getByText("Don't have access?")).toBeTruthy();
    const action = getByText('Request access');
    fireEvent.press(action);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('builds prompt from variant="signin" when no prompt is provided', () => {
    const onVariant = jest.fn();
    const { getByText } = render(<AuthFooterLinks variant="signin" variantAction={onVariant} />);

    expect(getByText("Don't have an account?")).toBeTruthy();
    const signUp = getByText('Sign up');
    fireEvent.press(signUp);
    expect(onVariant).toHaveBeenCalledTimes(1);
  });

  it('builds prompt from variant="signup" when no prompt is provided', () => {
    const onVariant = jest.fn();
    const { getByText } = render(<AuthFooterLinks variant="signup" variantAction={onVariant} />);

    expect(getByText('Already have an account?')).toBeTruthy();
    const signIn = getByText('Sign in');
    fireEvent.press(signIn);
    expect(onVariant).toHaveBeenCalledTimes(1);
  });

  it('renders both forgot and prompt rows together', () => {
    const onForgot = jest.fn();
    const onAction = jest.fn();

    const { getByText } = render(
      <AuthFooterLinks
        forgot={{ onPress: onForgot }}
        prompt={{ text: 'New here?', actionLabel: 'Create account', onPress: onAction }}
      />,
    );

    // Forgot row
    fireEvent.press(getByText('Forgot password?'));
    expect(onForgot).toHaveBeenCalledTimes(1);

    // Prompt row
    expect(getByText('New here?')).toBeTruthy();
    fireEvent.press(getByText('Create account'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
