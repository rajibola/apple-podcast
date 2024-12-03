import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, Share, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {
  BackIcon,
  FavIcon,
  Forward10seconds,
  NextIcon,
  PlayIcon,
  PrevIcon,
  Previous10seconds,
  ShareIcon,
  SolidPause,
} from '../../assets/svgs';
import {MText, ProgressBar} from '../../components';
import {MainStackParamList} from '../../navigations/RootStackNavigator';
import {usePlayerStore} from '../../store';
import {formatTime, hp, metrics, wp} from '../../utils';

type Props = NativeStackScreenProps<MainStackParamList, 'Player'>;

export function PlayerScreen({navigation}: Props) {
  const {
    isPlaying,
    currentTrack,
    seekForward10,
    seekBackward10,
    skipToNextTrack,
    skipToPreviousTrack,
  } = usePlayerStore();

  const progress = useProgress();
  const {position, duration} = progress;

  const onShare = async () => {
    if (!currentTrack || !currentTrack.title || !currentTrack.artist) {
      Alert.alert('Track information is incomplete');
      return;
    }

    try {
      Share.share({
        message: `Check out this podcast: "${currentTrack.title}" by ${currentTrack.artist}`,
        url: currentTrack.url,
      });
    } catch (error: any) {
      Alert.alert('Error sharing', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtonWrapper}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
        </View>
        <MText style={styles.pageTitle}>Now Playing</MText>
        <View style={styles.headerButtonWrapper}>
          <TouchableOpacity onPress={onShare} style={styles.backButton}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton}>
            <FavIcon style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.wrapper}>
        <FastImage
          style={styles.podcastCover}
          source={{
            uri: currentTrack?.artwork,
            priority: FastImage.priority.high,
          }}
        />
        <MText numberOfLines={1} style={styles.songTitle}>
          {currentTrack?.title}
        </MText>
        <MText numberOfLines={1} style={styles.songSubtitle}>
          {currentTrack?.artist}
        </MText>

        <View style={styles.timeWrapper}>
          <MText style={styles.time}>{formatTime(position)}</MText>
          <MText style={styles.time}>{formatTime(duration)}</MText>
        </View>

        <View>
          <ProgressBar />
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={seekBackward10}
            hitSlop={metrics.makeHitSlop(15)}>
            <Previous10seconds />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={skipToPreviousTrack}
            hitSlop={metrics.makeHitSlop(15)}>
            <PrevIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() =>
              isPlaying ? TrackPlayer.pause() : TrackPlayer.play()
            }>
            {isPlaying ? <SolidPause style={styles.playPause} /> : <PlayIcon />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={skipToNextTrack}
            hitSlop={metrics.makeHitSlop(15)}>
            <NextIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={seekForward10}
            hitSlop={metrics.makeHitSlop(15)}>
            <Forward10seconds />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  favIcon: {
    color: '#fff',
    width: wp(22),
    height: wp(22),
  },

  playPause: {
    width: wp(30),
    height: wp(30),
    color: '#333333',
  },
  playButton: {
    width: wp(60),
    height: wp(60),
    borderRadius: wp(60),
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(20),
    marginTop: hp(33),
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(30),
  },
  time: {
    fontWeight: '600',
    fontSize: hp(12),
    color: '#fff',
    opacity: 0.7,
  },
  wrapper: {
    paddingHorizontal: wp(20),
  },
  songSubtitle: {
    fontSize: hp(12),
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.7,
  },
  songTitle: {
    fontSize: hp(14),
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: hp(49),
    marginBottom: hp(5),
  },
  podcastCover: {
    width: wp(334),
    height: wp(334),
    marginHorizontal: 'auto',
    borderRadius: wp(10),
  },
  icon: {
    width: wp(24),
    height: wp(24),
    objectFit: 'cover',
  },
  headerButtonWrapper: {
    width: wp(86),
    flexDirection: 'row',
    gap: wp(8),
  },
  pageTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: hp(20),
  },
  header: {
    paddingHorizontal: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(40),
  },
  backButton: {
    width: wp(40),
    height: wp(40),
    borderWidth: wp(1),
    borderRadius: wp(40),
    borderColor: '#373737',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  text: {
    color: '#fff',
    fontFamily: 'SpaceMono',
  },
});
