import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Podcast} from '../api/applePodcast';
import {RootStackParamList} from '../navigations/BottomTabNavigator';
import {MainStackParamList} from '../navigations/RootStackNavigator';
import {hp, wp} from '../utils';
import {MText} from './CustomText';

interface SongListItemProps {
  item: Podcast;
}

type SongListItemNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>,
  NativeStackNavigationProp<MainStackParamList, 'Player'>
>;

export const SongListItem = ({item}: SongListItemProps) => {
  const {navigate} = useNavigation<SongListItemNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigate('Podcast', {podcast: item})}
      style={styles.songList}>
      <View style={styles.imageText}>
        <Image style={styles.listImage} source={{uri: item.artworkUrl600}} />
        <View style={styles.songText}>
          <MText numberOfLines={1} style={styles.title}>
            {item.trackName}
          </MText>
          <MText numberOfLines={1} style={styles.subtitle}>
            {`${item.artistName} • ${item.collectionName}`}
          </MText>
        </View>
      </View>
      <View style={styles.flex}>
        <TouchableOpacity onPress={() => navigate('Player', {item})}>
          <Image
            style={styles.icon}
            source={require('../assets/images/playcircle.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    gap: wp(9),
  },
  icon: {
    width: wp(26),
    height: wp(24),
  },
  imageText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: wp(14),
    opacity: 0.7,
  },
  songText: {
    marginLeft: wp(13.97),
    gap: hp(5),
    maxWidth: wp(182),
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(14),
  },
  songList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listImage: {
    width: wp(60.2),
    height: wp(56),
    backgroundColor: '#fff',
    borderRadius: wp(5),
    objectFit: 'cover',
  },
});
