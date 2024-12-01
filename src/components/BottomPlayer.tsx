import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hp} from '../utils/responsiveness';
import {MText} from './customText';

export const BottomPlayer = () => {
  return (
    <View style={styles.container}>
      <MText>Hello</MText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(70),
    backgroundColor: 'red',
  },
});
