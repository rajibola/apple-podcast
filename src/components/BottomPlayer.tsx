import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '../utils/responsiveness';
import {MText} from './customText';
import PlaySvgIcon from '../assets/svgs/PlaySvgIcon';
import PauseSvgIcon from '../assets/svgs/PauseSvgIcon';
import {metrics} from '../utils/makeHitSlop';
import {usePlayerStore} from '../store/playerStore';

export const BottomPlayer = () => {
  const {isPlaying} = usePlayerStore();
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={{uri: ''}} style={styles.image} />
        <MText style={styles.title}>Hello React Native</MText>
      </View>
      <TouchableOpacity hitSlop={metrics.makeHitSlop(20)}>
        {isPlaying ? (
          <PauseSvgIcon style={styles.playPause} />
        ) : (
          <PlaySvgIcon style={styles.playPause} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: hp(14),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(10),
  },
  playPause: {
    width: wp(30),
    height: wp(30),
    color: 'white',
  },
  image: {
    width: wp(50),
    height: wp(45),
    backgroundColor: '#fff',
    borderRadius: wp(6),
  },
  container: {
    height: hp(70),
    backgroundColor: '#212121',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
  },
});
