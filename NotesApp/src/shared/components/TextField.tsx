import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

export type TextFieldProps = TextInputProps & {
  label?: string;
  errorText?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  placeholderColor?: string; // ~ gray-400
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

type TextFieldRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};

const TextField = forwardRef<TextFieldRef, TextFieldProps>(function TextField(
  {
    label,
    errorText,
    left,
    right,
    inputClassName = '',
    containerClassName = '',
    labelClassName = '',
    placeholder,
    placeholderColor = '#9CA3AF', // ~ gray-400
    secureTextEntry,
    onFocus,
    onBlur,
    ...inputProps
  },
  ref,
) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
  }));

  const baseWrapper =
    'w-full rounded-xl border bg-neutral-50 dark:bg-neutral-800 px-3 flex-row items-center justfiy-between';
  const borderCls = errorText
    ? 'border-red-500'
    : focused
      ? 'border-blue-600'
      : 'border-neutral-300 dark:border-neutral-700';

  return (
    <View className={`w-full gap-3 ${containerClassName}`}>
      {label ? (
        <Text className={`mb-1 text-body font-bold text-text ${labelClassName}`}>{label}</Text>
      ) : null}
      <View className={`${baseWrapper} ${borderCls}`}>
        {left || null}
        <TextInput
          ref={inputRef}
          className={`p-3 font-medium text-body pb-3 bg-neutral-50 dark:bg-neutral-800 px-5 h-[50px] flex-1 ${inputClassName}`}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          secureTextEntry={secureTextEntry}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          // accessibility
          accessibilityRole="text"
          {...inputProps}
        />
        {right || null}
      </View>
    </View>
  );
});

export default TextField;
