import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, OutlineButton, TextField } from '@shared/ui';
import { ArrowLeft, Users, Trash2, Save } from 'lucide-react-native';
import Color from '@shared/theme/colors.json';

export default function NewNoteScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <Screen pad="lg" gap="lg" scroll>
      <View className="gap-4">
        <View className="flex-row items-center justify-between gap-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to notes"
            accessibilityHint="Returns to the notes list"
            onPress={() => navigation.navigate('Notes' as never)}
            className="flex-row items-center gap-2"
          >
            <ArrowLeft color={Color.text.DEFAULT} size={20} />
            <Text className="text-md font-semibold text-text">Back to Notes</Text>
          </Pressable>

          <View className="flex-row items-center gap-3">
            <OutlineButton
              icon={<Users color={Color.text.DEFAULT} size={18} />}
              onPress={() => {}}
              accessibilityLabel="Manage collaborators"
              accessibilityHint="Opens collaborator settings"
              className="w-[44px] h-[44px] px-3 py-3"
            />
            <OutlineButton
              icon={<Trash2 color={Color.text.DEFAULT} size={18} />}
              onPress={() => {}}
              accessibilityLabel="Delete note"
              accessibilityHint="Deletes the current note"
              className="w-[44px] h-[44px] px-3 py-3"
            />
            <OutlineButton
              icon={<Save color={Color.primary.DEFAULT} size={18} />}
              onPress={() => {}}
              accessibilityLabel="Save note"
              accessibilityHint="Saves your changes"
              className="w-[44px] h-[44px] border-primary-600/40 bg-primary-400/10 px-3 py-3"
            />
          </View>
        </View>

        <View className="rounded-3xl border border-line-200 bg-white p-5 gap-6">
          <TextField placeholder="Note title" value={title} onChangeText={setTitle} />

          <View className="gap-3">
            <Text className="text-md font-semibold text-text">Collaborators</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex-row items-center gap-2"
            >
              <View className="rounded-full bg-primary-100 px-3 py-1">
                <Text className="text-sm font-medium text-primary-600">You</Text>
              </View>
            </ScrollView>
          </View>

          <View className="rounded-2xl border border-line-200 bg-surface-50 p-4">
            <TextInput
              multiline
              placeholder="Start typing your note..."
              placeholderTextColor={Color.text.muted}
              textAlignVertical="top"
              className="min-h-[220px] text-body text-text"
              value={body}
              onChangeText={setBody}
              accessibilityRole="text"
              accessibilityLabel="Note body"
              accessibilityHint="Double tap to edit the note content"
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
