import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AuthScreen from '@features/auth/screens/AuthScreen';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  const isSignedIn = false; // wire to Redux later
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <Stack.Screen name="App" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
