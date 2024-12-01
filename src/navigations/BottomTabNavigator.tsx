import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import {FavouriteScreen} from '../screens/favourite';
import PodcastScreen from '../screens/podcast';
import {hp} from '../utils/responsiveness';
import {Podcast} from '../api/applePodcast';
import {TabBar} from '../components/TabBar';

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Podcast: {podcast: Podcast};
};

export type BottomTabParamList = {
  HomeStack: undefined;
  Favourites: undefined;
};

// Home Stack Navigator
const HomeStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Podcast" component={PodcastScreen} />
  </HomeStack.Navigator>
);

// Bottom Tab Navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBar={TabBar}
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
    }}>
    <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
    <Tab.Screen name="Favourites" component={FavouriteScreen} />
  </Tab.Navigator>
);

// Styles
const styles = StyleSheet.create({
  tabBar: {
    paddingTop: hp(21),
    backgroundColor: '#000',
    height: hp(80),
  },
});

export default BottomTabNavigator;
