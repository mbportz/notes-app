import React from 'react';
import { render } from '@testing-library/react-native';
import EmailField from '../EmailField';

// use the manual mock above
jest.mock('@shared/ui');

describe('EmailField', () => {
  it('sets email-related defaults on TextField', () => {
    const { getByTestId } = render(<EmailField />);
    const f = getByTestId('TextField').props;

    expect(f.keyboardType).toBe('email-address');
    expect(f.inputMode).toBe('email');
    expect(f.textContentType).toBe('emailAddress');
    expect(f.autoComplete).toBe('email');
    expect(f.autoCapitalize).toBe('none');
    expect(f.autoCorrect).toBe(false);
    expect(f.spellCheck).toBe(false);
  });

  it('forwards arbitrary TextFieldProps to TextField', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <EmailField placeholder="Your email" value="a@b.com" onChangeText={handleChange} />,
    );
    const f = getByTestId('TextField').props;

    expect(f.placeholder).toBe('Your email');
    expect(f.value).toBe('a@b.com');
    expect(f.onChangeText).toBe(handleChange);
  });

  it('allows overriding non-email props without touching enforced ones', () => {
    const { getByTestId } = render(<EmailField placeholder="Email" secureTextEntry={false} />);
    const f = getByTestId('TextField').props;

    // still enforced
    expect(f.keyboardType).toBe('email-address');
    expect(f.inputMode).toBe('email');
    expect(f.autoCapitalize).toBe('none');

    // custom non-email prop is forwarded
    expect(f.secureTextEntry).toBe(false);
  });
});
