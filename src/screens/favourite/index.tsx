import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MText} from '../../components/customText';
// import {SongListItem} from '../../components/SongListItem';
import React from 'react';
import {hp, wp} from '../../utils/responsiveness';

export const FavouriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContainer}>
        <MText style={styles.title}>Favourites</MText>

        <View style={styles.songList}>
          {/* <SongListItem
            songTitle="Tech Talk"
            songSubtitle="Dev World • Episode 10"
            listImageSource={require('../../assets/images/icon.png')}
          /> */}
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
