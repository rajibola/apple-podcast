import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MText} from '../../components/customText';
import {DownloadListItem} from '../../components/DownloadListItem';
import {
  DownloadedFile,
  useDownloadManagerStore,
} from '../../store/downloadStore';
import {usePlayerStore} from '../../store/playerStore';
import {hp, wp} from '../../utils/responsiveness';

export default function DownloadScreen() {
  const {downloadedFiles, fetchDownloadedFiles} = useDownloadManagerStore();
  const {start, currentTrack} = usePlayerStore();

  // Initialize the player and fetch files
  useEffect(() => {
    const init = async () => {
      fetchDownloadedFiles();
    };
    init();
  }, [fetchDownloadedFiles]);

  const handlePlayAudio = (item: DownloadedFile) => {
    start({
      artist: item.artist,
      id: item.id,
      title: item.title,
      url: `file://${item.path}`,
      artwork: item.artwork,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContainer}>
        <MText style={styles.title}>Downloads</MText>

        <FlatList
          contentContainerStyle={styles.songList}
          data={downloadedFiles}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <DownloadListItem
              item={item}
              onClickPlay={() => handlePlayAudio(item)}
              isCurrent={currentTrack?.id === item.id}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
});
