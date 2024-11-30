import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '../utils/responsiveness';
import {MText} from './customText';
import {Podcast} from '../api/applePodcast';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type ActionButtonType = 'favorite' | 'download';

const actionButtonImages: Record<ActionButtonType, any> = {
  favorite: require('../assets/images/favorite.png'),
  download: require('../assets/images/download-icon.png'),
};

interface SongListItemProps {
  actionButtonType?: ActionButtonType;
  item: Podcast;
}

type IHomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

export const SongListItem = ({
  actionButtonType = 'favorite',
  item,
}: SongListItemProps) => {
  const {navigate} = useNavigation<IHomeScreenProp>();

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
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={actionButtonImages[actionButtonType]}
          />
        </TouchableOpacity>
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
