import React from 'react';
import { Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextLink } from '@shared/ui';
import { useLogout } from '@features/auth/hooks';

export default function HomeScreen() {
  const { logout } = useLogout();
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold dark:text-white">Home</Text>
      <Pressable accessibilityRole="button" className="mt-4 rounded-xl px-4 py-2 bg-blue-600">
        <Text className="text-white font-medium">Tap me</Text>
      </Pressable>
      <Pressable accessibilityRole="button">
        <TextLink linkTitle={'Logout'} containerClassName="p-3 m-3 " onPress={logout} />
      </Pressable>
    </SafeAreaView>
  );
}
