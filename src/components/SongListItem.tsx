import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Podcast} from '../api/applePodcast';
import {RootStackParamList} from '../navigations/BottomTabNavigator';
import {MainStackParamList} from '../navigations/RootStackNavigator';
import {hp, wp} from '../utils';
import {MText} from './CustomText';
import FastImage from 'react-native-fast-image';

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
        <FastImage
          style={styles.listImage}
          source={{uri: item.artworkUrl600, priority: FastImage.priority.high}}
          resizeMode={FastImage.resizeMode.cover}
        />
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
        {/* FIXME: this is collection, so I put the favourite feature in the podcast item  */}
        <TouchableOpacity onPress={() => null}>
          <Image
            style={styles.icon}
            source={require('../assets/images/favorite.png')}
          />
        </TouchableOpacity>
        {/* TODO: make it play the first item on podcast */}
        <TouchableOpacity onPress={() => null}>
          <Image
            style={styles.icon}
            source={require('../assets/images/playcircle.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export const SongListItemSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    shimmer.start();

    return () => shimmer.stop();
  }, [shimmerAnimation]);

  const shimmerBackground = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccccccd5', '#e0e0e0da'],
  });

  return (
    <View style={styles.songList}>
      {/* Animated Placeholder for Image */}
      <Animated.View
        style={[styles.imageSkeleton, {backgroundColor: shimmerBackground}]}
      />
      {/* Animated Placeholder for Text */}
      <View style={styles.textContainer}>
        <Animated.View
          style={[styles.titleSkeleton, {backgroundColor: shimmerBackground}]}
        />
        <Animated.View
          style={[
            styles.subtitleSkeleton,
            {backgroundColor: shimmerBackground},
          ]}
        />
      </View>
      {/* Animated Placeholder for Play Icon */}
      <Animated.View
        style={[styles.iconSkeleton, {backgroundColor: shimmerBackground}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  songList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageSkeleton: {
    width: wp(60.2),
    height: wp(56),
    borderRadius: wp(5),
  },
  textContainer: {
    marginLeft: wp(13.97),
    maxWidth: wp(182),
    flex: 1,
    justifyContent: 'center',
    gap: hp(5),
  },
  titleSkeleton: {
    width: wp(100),
    height: hp(10),
    borderRadius: wp(2),
  },
  subtitleSkeleton: {
    width: wp(140),
    height: hp(8),
    borderRadius: wp(2),
  },
  iconSkeleton: {
    width: wp(26),
    height: wp(24),
    borderRadius: wp(12),
  },
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

  listImage: {
    width: wp(60.2),
    height: wp(56),
    backgroundColor: '#fff',
    borderRadius: wp(5),
    objectFit: 'cover',
  },
});
