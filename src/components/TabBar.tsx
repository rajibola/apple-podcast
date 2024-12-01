import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hp} from '../utils/responsiveness';
import {MText} from './customText';
import {BottomPlayer} from './BottomPlayer';

export const TabBar = () => {
  return (
    <>
      <BottomPlayer />
      <View style={styles.container}>
        <MText>Hello Lol</MText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(80),
    backgroundColor: 'black',
  },
});
