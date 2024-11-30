import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FavouriteScreen} from '../screens/favourite';
import HomeScreen from '../screens/home';
import {hp} from '../utils/responsiveness';

export type BottomTabParamList = {
  Home: undefined;
  Favourites: undefined;
  Favourite: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: hp(21),
    backgroundColor: '#000',
    height: hp(80),
  },
});

export default BottomTabNavigator;
