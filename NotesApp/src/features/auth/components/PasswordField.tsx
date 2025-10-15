import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { TextFieldProps } from '@shared/ui/TextField';
import { TextField } from '@shared/ui';
import { Eye, EyeClosed, View } from 'lucide-react-native';
import colors from '@theme/colors.json';

const PasswordField = ({
  ...inputProps
}: Omit<TextFieldProps, 'secureTextEntry' | 'autoCapitalize'>) => {
  const [secure, setSecure] = useState(true);

  return (
    <TextField
      secureTextEntry={secure}
      autoCapitalize="none"
      right={
        <Pressable className="p-3" onPress={() => setSecure((prev) => !prev)}>
          {secure ? <Eye color={colors.text.muted} /> : <EyeClosed color={colors.text.muted} />}
        </Pressable>
      }
      {...inputProps}
    />
  );
};

export default PasswordField;
