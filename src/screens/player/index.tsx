import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import {useProgress} from 'react-native-track-player';
import BackIcon from '../../assets/svgs/BackIcon';
import Forward10seconds from '../../assets/svgs/Forward10seconds';
import NextIcon from '../../assets/svgs/NextIcon';
import PlayIcon from '../../assets/svgs/PlayIcon';
import PrevIcon from '../../assets/svgs/PrevIcon';
import Previous10seconds from '../../assets/svgs/Previous10seconds';
import ShareIcon from '../../assets/svgs/SearchIcon';
import SolidPause from '../../assets/svgs/SolidPause';
import {MText} from '../../components/customText';
import {MainStackParamList} from '../../navigations/RootStackNavigator';
import {usePlayerStore} from '../../store/playerStore';
import {metrics} from '../../utils/makeHitSlop';
import {hp, wp} from '../../utils/responsiveness';
import {ProgressBar} from '../../components/ProgressBar';
import {formatTime} from '../../utils/formatTime';

type Props = NativeStackScreenProps<MainStackParamList, 'Player'>;

export default function PlayerScreen({navigation}: Props) {
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
          <TouchableOpacity style={styles.backButton}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton}>
            <Image
              style={styles.icon}
              source={require('../../assets/images/favorite.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Image
          style={styles.podcastCover}
          source={{uri: currentTrack?.artwork}}
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
