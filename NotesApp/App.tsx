import './global.css';

import React from 'react';
import StoreProvider from './src/app/providers/StoreProvider';
import RootNavigator from './src/app/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </StoreProvider>
  );
}
