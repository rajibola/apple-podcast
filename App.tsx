/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from './src/screens/home';
import {FavouriteScreen} from './src/screens/favourite';

export type RootStackParamList = {
  Home: undefined;
  Favourite: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Favourite" component={FavouriteScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
