import React from 'react';
import type { TextFieldProps } from '@shared/components/TextField';
import { TextField } from '@shared/components';

const EmailField = ({
  ...inputProps
}: Omit<
  TextFieldProps,
  'keyboardType' | 'autoCapitalize' | 'autoComplete' | 'textContentType' | 'inputMode'
>) => {
  return (
    <TextField
      keyboardType="email-address"
      inputMode="email"
      textContentType="emailAddress"
      autoComplete="email"
      autoCapitalize="none"
      autoCorrect={false}
      spellCheck={false}
      {...inputProps}
    />
  );
};

export default EmailField;
