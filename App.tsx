import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Podcast} from './src/api/applePodcast';
import BottomTabNavigator from './src/navigations/BottomTabNavigator'; // Import the extracted component
import PlayerScreen from './src/screens/player';
import PodcastScreen from './src/screens/podcast';

export type RootStackParamList = {
  Tabs: undefined;
  Podcast: {
    podcast: Podcast;
  };
  Player: {
    item: Podcast;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Tabs"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Tabs" component={BottomTabNavigator} />
        <RootStack.Screen name="Podcast" component={PodcastScreen} />
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
}

export default App;
