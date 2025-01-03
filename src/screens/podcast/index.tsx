import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FeedItem} from 'react-native-rss-parser';
import {SafeAreaView} from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import {BackIcon} from '../../assets/svgs';
import {FeedListItem, MText} from '../../components';
import {RootStackParamList} from '../../navigations/BottomTabNavigator';
import {
  useDownloadManagerStore,
  useFavouritesStore,
  usePodcastsStore,
} from '../../store';
import {hp, wp} from '../../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Podcast'>;

export function PodcastScreen({route, navigation}: Props) {
  const {podcast} = route.params;
  const {feed, loadFeed, setFeed, cachedFeeds} = usePodcastsStore();
  const {addToQueue, getDownloadElementById} = useDownloadManagerStore();
  const {addFavourite, removeFavourite, favourites} = useFavouritesStore();
  const [hasTracksAdded, setHasTracksAdded] = useState(false);

  const loadAllFeeds = useCallback(async () => {
    await loadFeed(podcast.feedUrl);
  }, [podcast.feedUrl, loadFeed]);

  const onDownloadPress = (feedItem: FeedItem) => {
    addToQueue(feedItem.id, feedItem.enclosures[0].url);
  };

  useEffect(() => {
    loadAllFeeds();

    return () => setFeed(null);
  }, [loadAllFeeds, setFeed]);

  const handlePlayAudio = async (idx: number) => {
    const currentFeed = await cachedFeeds[podcast.feedUrl];
    await TrackPlayer.reset();
    if (!hasTracksAdded && currentFeed) {
      await TrackPlayer.add(
        currentFeed?.items.map(item => ({
          url: item.enclosures[0].url,
          artwork: item.itunes.image,
          title: item.title,
          artist: item.authors[0]?.name,
        })),
      );
      setHasTracksAdded(true);
    }
    TrackPlayer.skip(idx);
    TrackPlayer.play();
  };

  const handleToggleFav = (idx: number) => {
    const item = feed!.items[idx];
    if (favourites.has(item.id)) {
      removeFavourite(item.id);
    } else {
      addFavourite(item);
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
        <MText style={styles.pageTitle}>Podcast</MText>
        <View style={styles.headerButtonWrapper} />
      </View>

      <View style={styles.wrapper}>
        <FastImage
          style={styles.podcastCover}
          source={{
            uri: podcast.artworkUrl600,
            priority: FastImage.priority.high,
          }}
        />
        <View style={styles.collection}>
          <MText style={styles.songTitle}>{podcast.collectionName}</MText>
          <MText style={styles.songSubtitle}>{podcast.artistName}</MText>
        </View>
      </View>
      {!feed ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#f2f2f2" size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.songList}
          data={feed.items}
          keyExtractor={item => String(item.id)}
          renderItem={({item, index}) => (
            <FeedListItem
              downloadElement={getDownloadElementById(item.id)}
              onClickDownload={onDownloadPress}
              item={item}
              onClickPlay={() => handlePlayAudio(index)}
              onToggleFav={() => handleToggleFav(index)}
              isFavourite={Boolean(favourites.has(item.id))}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  collection: {
    flex: 1,
    alignSelf: 'flex-end',
    paddingVertical: hp(10),
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songList: {
    gap: hp(10),
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(10),
  },
  songSubtitle: {
    fontSize: hp(12),
    color: '#fff',
    fontWeight: '500',
    opacity: 0.7,
  },
  songTitle: {
    fontSize: hp(14),
    color: '#fff',
    fontWeight: '600',
    marginBottom: hp(5),
    flexWrap: 'wrap',
  },
  podcastCover: {
    width: wp(120),
    height: wp(120),
    borderRadius: wp(10),
  },
  icon: {
    width: wp(24),
    height: wp(24),
    objectFit: 'cover',
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    gap: wp(8),
    minWidth: wp(40),
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
