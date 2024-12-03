import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {FeedItem} from 'react-native-rss-parser';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MText} from '../../components/customText';
import {FavListItem} from '../../components/FavListItem';
import useFavouritesStore from '../../store/favouritesStore';
import {usePlayerStore} from '../../store/playerStore';
import {hp, wp} from '../../utils/responsiveness';

export const FavouriteScreen = () => {
  const {favourites, removeFavourite} = useFavouritesStore();
  const {start, currentTrack} = usePlayerStore();

  const handlePlayAudio = async (item: FeedItem) => {
    console.log(currentTrack?.id, item.id);
    start({
      id: item.id,
      url: item.enclosures[0].url,
      title: item.title,
      artist: item.authors[0]?.name,
      artwork: item.itunes.image,
      duration: item.itunes.duration,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContainer}>
        <MText style={styles.title}>Favourites</MText>

        <View style={styles.songList}>
          <FlatList
            contentContainerStyle={styles.songList}
            data={Array.from(favourites.values())}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <FavListItem
                item={item}
                onClickPlay={() => handlePlayAudio(item)}
                onToggleFav={() => removeFavourite(item.id)}
                isFavourite={Boolean(favourites.has(item.id))}
                isCurrent={currentTrack?.id === item.id}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  songList: {
    gap: hp(20),
    marginTop: hp(43),
  },
  bottomContainer: {
    paddingHorizontal: wp(20),
  },
  title: {
    fontSize: hp(20),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});
