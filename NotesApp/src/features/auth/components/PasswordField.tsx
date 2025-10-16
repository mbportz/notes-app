import React, { useState } from 'react';
import { Pressable } from 'react-native';
import type { TextFieldProps } from '@shared/ui/TextField';
import { TextField } from '@shared/ui';
import { Eye, EyeClosed } from 'lucide-react-native';
import Color from '@shared/theme/colors.json';

const PasswordField = ({
  ...inputProps
}: Omit<TextFieldProps, 'secureTextEntry' | 'autoCapitalize'>) => {
  const [secure, setSecure] = useState(true);

  return (
    <TextField
      secureTextEntry={secure}
      autoCapitalize="none"
      right={
        <Pressable
          accessibilityRole="button"
          className="p-3"
          onPress={() => setSecure((prev) => !prev)}
        >
          {secure ? <Eye color={Color.text.muted} /> : <EyeClosed color={Color.text.muted} />}
        </Pressable>
      }
      {...inputProps}
    />
  );
};

export default PasswordField;
