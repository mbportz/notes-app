import React, { useState } from 'react';
import { Text } from 'react-native';
import type { TextFieldProps } from '@shared/ui/TextField';
import { TextField } from '@shared/ui';

const PasswordField = ({
  ...inputProps
}: Omit<TextFieldProps, 'secureTextEntry' | 'autoCapitalize'>) => {
  const [secure, setSecure] = useState(true);

  return (
    <TextField
      secureTextEntry={secure}
      autoCapitalize="none"
      right={
        <Text onPress={() => setSecure((prev) => !prev)} className="text-text-muted">
          {secure ? '👁️‍🗨️' : '🙈'}
        </Text>
      }
      {...inputProps}
    />
  );
};

export default PasswordField;
