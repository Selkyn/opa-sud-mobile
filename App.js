import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper'; // Import du Provider
import TabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider> {/* Ajoute PaperProvider ici */}
        <TabNavigator />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
