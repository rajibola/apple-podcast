import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer from 'react-native-track-player';
import {PauseSvgIcon, PlaySvgIcon} from '../assets/svgs';
import {RootStackParamList} from '../navigations/BottomTabNavigator';
import {MainStackParamList} from '../navigations/RootStackNavigator';
import {usePlayerStore} from '../store';
import {hp, metrics, wp} from '../utils';
import {MText} from './CustomText';

type SongListItemNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>,
  NativeStackNavigationProp<MainStackParamList, 'Player'>
>;

export const BottomPlayer = () => {
  const {isPlaying, currentTrack} = usePlayerStore();
  const {navigate} = useNavigation<SongListItemNavigationProp>();

  if (!currentTrack) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate('Player', {
          item: {
            artworkUrl600: currentTrack.artwork,
            collectionName: currentTrack.title,
            artistName: currentTrack.artist,
          },
        })
      }>
      <View style={styles.leftSection}>
        <FastImage
          source={{
            uri: currentTrack?.artwork as string,
            priority: FastImage.priority.high,
          }}
          style={styles.image}
        />
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
    </TouchableOpacity>
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
