import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FavIcon from '../assets/svgs/FavIcon';
import FilledFavIcon from '../assets/svgs/FilledFavIcon';
import {DownloadedFile} from '../store/downloadStore';
import {hp, wp} from '../utils/responsiveness';
import {MText} from './customText';

interface IDownloadListItem {
  item: DownloadedFile;
  onClickPlay: () => void;
  onToggleFav?: () => void;
  isFavourite?: Boolean;
  isCurrent?: Boolean;
}

export const DownloadListItem = ({
  item,
  onClickPlay,
  onToggleFav,
  isFavourite,
  isCurrent,
}: IDownloadListItem) => {
  return (
    <TouchableOpacity
      onPress={onClickPlay}
      style={[styles.feedList, isCurrent && styles.current]}>
      <View>
        <MText numberOfLines={2} style={styles.feedTitle}>
          {item.title}
        </MText>
        <MText style={styles.feedDuration}>{item.artist}</MText>
      </View>
      <View style={styles.buttons}>
        {isFavourite ? (
          <TouchableOpacity onPress={onToggleFav}>
            <FilledFavIcon style={styles.pause} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onToggleFav}>
            <FavIcon style={styles.pause} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  current: {
    backgroundColor: '#ffffff67',
  },
  buttons: {
    flexDirection: 'row',
    gap: wp(10),
  },
  pause: {color: '#fff', width: wp(22), height: wp(22)},
  feedDuration: {
    color: '#fff',
    opacity: 0.7,
    fontSize: hp(12),
  },
  feedTitle: {
    color: '#fff',
    fontWeight: '500',
    marginBottom: hp(4),
    fontSize: hp(13),
    width: wp(270),
  },
  feedList: {
    padding: hp(5),
    paddingVertical: hp(8),
    borderBottomWidth: hp(0.5),
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
