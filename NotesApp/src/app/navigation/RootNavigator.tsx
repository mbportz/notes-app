import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import TabNavigator from './TabNavigator';
import AuthScreen from '@features/auth/screens/AuthScreen';
import { RootState } from '@shared/store';
import { useAuthBootstrap } from '@features/auth/hooks';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  const { bootstrapped } = useAuthBootstrap();
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);

  if (!bootstrapped) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
