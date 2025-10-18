import React from 'react';
import { View } from 'react-native';
import { Search } from 'lucide-react-native';
import Color from '@shared/theme/colors.json';
import { TextField } from '@shared/ui';

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search note',
  className,
}: SearchBarProps) {
  return (
    <View className={`w-full ${className ?? ''}`}>
      <TextField
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        left={
          <View className="px-2">
            <Search color={Color.text.muted} size={20} />
          </View>
        }
        containerClassName="w-full"
      />
    </View>
  );
}
