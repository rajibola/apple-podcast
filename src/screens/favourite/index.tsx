import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import {FavListItem, MText} from '../../components';
import {useFavouritesStore, usePlayerStore} from '../../store';
import {hp, wp} from '../../utils';

export const FavouriteScreen = () => {
  const {favourites, removeFavourite} = useFavouritesStore();
  const {currentTrack} = usePlayerStore();
  const [hasTracksAdded, setHasTracksAdded] = useState(false);

  const handlePlayAudio = async (idx: number) => {
    await TrackPlayer.reset();
    if (!hasTracksAdded) {
      await TrackPlayer.add(
        Array.from(favourites.values())?.map(item => ({
          id: item.id,
          url: item.enclosures[0].url,
          artwork: item.itunes.image,
          title: item.title,
          artist: item.authors[0]?.name,
        })),
      );
      setHasTracksAdded(true);
    }

    await TrackPlayer.skip(idx);
    await TrackPlayer.play();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContainer}>
        <MText style={styles.title}>Favourites</MText>

        <FlatList
          contentContainerStyle={styles.songList}
          data={Array.from(favourites.values())}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <FavListItem
              item={item}
              onClickPlay={() => handlePlayAudio(index)}
              onToggleFav={() => removeFavourite(item.id)}
              isFavourite={Boolean(favourites.has(item.id))}
              isCurrent={currentTrack?.id === item.id}
            />
          )}
        />
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
