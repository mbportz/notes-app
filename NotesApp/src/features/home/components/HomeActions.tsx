import React from 'react';
import { View } from 'react-native';
import GradientButton from '@features/auth/components/GradientButton';
import { NotebookPen } from 'lucide-react-native';
import SearchBar from './SearchBar';

type HomeActionsProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onNewNote?: () => void;
};

export default function HomeActions({ searchValue, onSearchChange, onNewNote }: HomeActionsProps) {
  return (
    <View className="flex-row items-center justify-center gap-3 w-full">
      <SearchBar className="flex-[0.9]" value={searchValue} onChangeText={onSearchChange} />
      <GradientButton
        title=""
        onPress={onNewNote}
        leftIcon={<NotebookPen color="#fff" size={18} />}
        className="h-[50px] flex-[0.1] min-w-[30px] item"
        textClassName="text-md"
      />
    </View>
  );
}
