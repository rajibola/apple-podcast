import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '../utils/responsiveness';
import {MText} from './customText';
import PlaySvgIcon from '../assets/svgs/PlaySvgIcon';
import PauseSvgIcon from '../assets/svgs/PauseSvgIcon';
import {metrics} from '../utils/makeHitSlop';
import {usePlayerStore} from '../store/playerStore';
import TrackPlayer from 'react-native-track-player';

export const BottomPlayer = () => {
  const {isPlaying, currentTrack} = usePlayerStore();
  if (!currentTrack) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={{uri: currentTrack?.artwork}} style={styles.image} />
        <MText numberOfLines={2} style={styles.title}>
          {currentTrack?.title}
        </MText>
      </View>
      {isPlaying ? (
        <TouchableOpacity
          onPress={() => TrackPlayer.pause()}
          hitSlop={metrics.makeHitSlop(20)}>
          <PauseSvgIcon style={styles.playPause} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => TrackPlayer.play()}
          hitSlop={metrics.makeHitSlop(20)}>
          <PlaySvgIcon style={styles.playPause} />
        </TouchableOpacity>
      )}

      {/* <TouchableOpacity onPress={seek30}>
        <View style={[styles.playPause, {backgroundColor: 'red'}]} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: hp(14),
    lineHeight: hp(20),
    width: wp(240),
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
