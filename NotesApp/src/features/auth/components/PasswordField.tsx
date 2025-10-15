import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { TextFieldProps } from '@shared/ui/TextField';
import { TextField } from '@shared/ui';
import { Eye, EyeClosed, View } from 'lucide-react-native';

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
          {secure ? <Eye color="#6B7280" /> : <EyeClosed color="#6B7280" />}
        </Pressable>
      }
      {...inputProps}
    />
  );
};

export default PasswordField;
