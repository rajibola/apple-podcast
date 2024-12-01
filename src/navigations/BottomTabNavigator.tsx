import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Podcast} from '../api/applePodcast';
import {TabBar} from '../components/TabBar';
import DownloadScreen from '../screens/download';
import {FavouriteScreen} from '../screens/favourite';
import HomeScreen from '../screens/home';
import PodcastScreen from '../screens/podcast';

// Navigation Types
export type RootStackParamList = {
  HomeScreen: undefined;
  Podcast: {podcast: Podcast};
};

export type BottomTabParamList = {
  Home: undefined;
  Favourites: undefined;
  Downloads: undefined;
};

// Home Stack Navigator
const HomeStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="Podcast" component={PodcastScreen} />
  </HomeStack.Navigator>
);

// Bottom Tab Navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBar={props => <TabBar {...props} />}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Favourites" component={FavouriteScreen} />
    <Tab.Screen name="Downloads" component={DownloadScreen} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
