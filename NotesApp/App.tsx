import './global.css';

import React from 'react';
import AppProviders from '@app/providers/AppProvider';
import RootNavigator from './src/app/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <AppProviders>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AppProviders>
  );
}
