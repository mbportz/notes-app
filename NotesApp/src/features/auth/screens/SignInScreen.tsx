import React from 'react';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold dark:text-white">Home</Text>
      <Pressable className="mt-4 rounded-xl px-4 py-2 bg-blue-600">
        <Text className="text-white font-medium">Tap me</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignInScreen;
