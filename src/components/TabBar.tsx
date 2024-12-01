import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '../utils/responsiveness';
import {MText} from './customText';
import {BottomPlayer} from './BottomPlayer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {routes} from '../navigations/routes';

const ICONS = {
  [routes.HOME]: require('../assets/images/home.png'),
  [routes.FAVOURITES]: require('../assets/images/favorite.png'),
  [routes.DOWNLOADS]: require('../assets/images/download-icon.png'),
};

export const TabBar = (props: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const onTabPress = (routeName: string) => () => {
    props.navigation.navigate(routeName);
  };
  return (
    <>
      <BottomPlayer />
      <View
        style={{
          ...styles.container,
          height: hp(80 + insets.bottom),
          paddingBottom: hp(insets.bottom),
        }}>
        {props.state.routes.map((route, index) => {
          const isActive = props.state.index === index;
          const icon = ICONS[route.name];
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.button, isActive && styles.activeButton]}
              onPress={onTabPress(route.name)}>
              <Image source={icon} style={styles.icon} />
              {isActive && <MText style={styles.iconText}>{route.name}</MText>}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconText: {
    fontSize: hp(12),
    fontWeight: '600',
  },
  activeButton: {
    backgroundColor: '#E83536',
  },
  icon: {
    width: wp(24),
    height: wp(24),
  },
  button: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(14),
    paddingVertical: hp(7),
    borderRadius: wp(20),
    gap: wp(5),
  },
  container: {
    height: hp(80),
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
  },
});
