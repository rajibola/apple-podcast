import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Podcast} from '../api/applePodcast';
import {TabBar} from '../components';
import {
  DownloadScreen,
  FavouriteScreen,
  HomeScreen,
  PodcastScreen,
  CategoryScreen,
} from '../screens';

export type RootStackParamList = {
  HomeScreen: undefined;
  Podcast: {podcast: Podcast};
};

export type BottomTabParamList = {
  Home: undefined;
  Favourites: undefined;
  Downloads: undefined;
  Category: undefined;
};

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator: React.FC = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="Podcast" component={PodcastScreen} />
  </HomeStack.Navigator>
);

// Bottom Tab Navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => (
  <Tab.Navigator
    // eslint-disable-next-line react/no-unstable-nested-components
    tabBar={props => <TabBar {...props} />}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Category" component={CategoryScreen} />
    <Tab.Screen name="Favourites" component={FavouriteScreen} />
    <Tab.Screen name="Downloads" component={DownloadScreen} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
