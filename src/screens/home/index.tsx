import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import {Podcast, searchPodcasts} from '../../api/applePodcast';
import {MText} from '../../components/customText';
import {SearchBar} from '../../components/SearchBar';
import {SongListItem} from '../../components/SongListItem';
import {hp, wp} from '../../utils/responsiveness';
// import TrackPlayer from 'react-native-track-player';

// type IHomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

export default function HomeScreen() {
  const [query, setQuery] = useState<string>('');
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchPodcasts(query);
      setPodcasts(results);
    } catch (error) {
      console.error('Error searching podcasts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const prefetch = async () => {
      const results = await searchPodcasts('react native');
      setPodcasts(results);
    };
    prefetch();

    TrackPlayer.setupPlayer().then(async () => {
      // console.log('Player is setup');
      // await TrackPlayer.add({
      //   id: 'trackId',
      //   url: 'https://traffic.libsyn.com/secure/syntax/Syntax222.mp3',
      //   title: 'Track Title',
      //   artist: 'Track Artist',
      //   // artwork: require('track.png'),
      // });
    });

    // TrackPlayer.play();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarText}>
          <Image
            style={styles.userIcon}
            source={require('../../assets/images/user-icon.png')}
          />
          <View>
            <MText style={styles.helloText}>Hello</MText>
            <MText style={styles.name}>John Doe</MText>
          </View>
        </View>
        <View style={styles.iconWrapper}>
          <Image
            source={require('../../assets/images/notification-icon.png')}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <MText style={styles.title}>Explore New Podcasts</MText>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <MText style={styles.subtitle}>Podcasts</MText>
      </View>

      {loading ? (
        <MText>Loading...</MText>
      ) : (
        <FlatList
          contentContainerStyle={styles.songList}
          showsVerticalScrollIndicator={false}
          data={podcasts}
          keyExtractor={item => item.collectionId.toString()}
          renderItem={({item}) => <SongListItem item={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: wp(20),
  },
  avatarText: {flexDirection: 'row', alignItems: 'center'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: wp(15),
    marginRight: wp(21),
    marginBottom: hp(17),
  },
  songList: {
    gap: hp(20),
    paddingHorizontal: wp(20),
  },

  title: {
    fontSize: hp(20),
    fontWeight: 'bold',
    color: '#fff',
  },
  iconWrapper: {
    width: wp(40),
    height: wp(40),
    borderWidth: wp(1),
    borderColor: '#373737',
    borderRadius: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#fff',
    fontSize: hp(12),
    fontWeight: '700',
  },
  userIcon: {
    width: wp(50),
    height: wp(50),
    marginRight: wp(7),
  },
  helloText: {
    color: '#fff',
    fontSize: hp(12),
    marginBottom: hp(1),
    opacity: 0.7,
  },
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  subtitle: {
    fontSize: hp(16),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp(12),
  },
});
