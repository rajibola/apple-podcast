import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';
import BackIcon from '../../assets/svgs/BackIcon';
import Forward10seconds from '../../assets/svgs/Forward10seconds';
import NextIcon from '../../assets/svgs/NextIcon';
import PlayIcon from '../../assets/svgs/PlayIcon';
import PrevIcon from '../../assets/svgs/PrevIcon';
import Previous10seconds from '../../assets/svgs/Previous10seconds';
import ShareIcon from '../../assets/svgs/SearchIcon';
import {MText} from '../../components/customText';
import {hp, wp} from '../../utils/responsiveness';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

export default function PlayerScreen({route, navigation}: Props) {
  const {item} = route.params;
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
        <Image style={styles.podcastCover} source={{uri: item.artworkUrl600}} />
        <MText style={styles.songTitle}>{item.collectionName}</MText>
        <MText style={styles.songSubtitle}>{item.artistName}</MText>
        <View style={styles.timeWrapper}>
          <MText style={styles.time}>02:21</MText>
          <MText style={styles.time}>03:22</MText>
        </View>
        <View style={styles.playProgress} />

        <View style={styles.bottomButtons}>
          <Previous10seconds />
          <PrevIcon />
          <TouchableOpacity style={styles.playButton}>
            <PlayIcon />
          </TouchableOpacity>
          <NextIcon />
          <Forward10seconds />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  playProgress: {
    height: hp(54),
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: hp(10),
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
