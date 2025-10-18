import React from 'react';
import { View, Text } from 'react-native';
import { FileText } from 'lucide-react-native';
import Color from '@shared/theme/colors.json';

type EmptyNotesProps = {
  className?: string;
};

export default function EmptyNotes({ className = '' }: EmptyNotesProps) {
  return (
    <View className={`w-full items-center gap-6 px-6 py-12 ${className}`}>
      <View className="size-[96px] items-center justify-center rounded-full bg-primary-400/20">
        <FileText color={Color.primary.DEFAULT} size={36} strokeWidth={1.5} />
      </View>
      <View className="items-center gap-3 px-4">
        <Text className="text-h1 font-semibold text-text text-center">No notes yet</Text>
        <Text className="text-body text-center text-text-muted leading-6">
          Start creating your first note to capture your thoughts and ideas.
        </Text>
      </View>
    </View>
  );
}
