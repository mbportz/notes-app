import React from 'react';
import type { TextFieldProps } from '@shared/ui/TextField';
import { TextField } from '@shared/ui';

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
