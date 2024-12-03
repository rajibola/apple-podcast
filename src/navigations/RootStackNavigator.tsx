import {NavigationContainer} from '@react-navigation/native';
import {Podcast} from '../api/applePodcast';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import PlayerScreen from '../screens/player';

export type MainStackParamList = {
  Tabs: undefined;
  Player: {
    item: Podcast | {};
  };
};

const RootStack = createNativeStackNavigator<MainStackParamList>();

const RootStackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar animated barStyle="light-content" />
      <RootStack.Navigator
        initialRouteName="Tabs"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Tabs" component={BottomTabNavigator} />
        <RootStack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            presentation: 'containedModal',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
