import React from 'react';
import RootStackNavigator from './src/navigations/RootStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}

export default App;
