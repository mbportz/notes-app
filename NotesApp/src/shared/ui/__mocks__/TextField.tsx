// TextField manual mock
import React from 'react';
import { View } from 'react-native';
import { TextFieldProps } from '../TextField';

const TextField = (props: TextFieldProps) => <View testID="TextField" {...props} />;

export default TextField;
