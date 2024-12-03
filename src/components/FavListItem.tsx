import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FeedItem} from 'react-native-rss-parser';
import FavIcon from '../assets/svgs/FavIcon';
import FilledFavIcon from '../assets/svgs/FilledFavIcon';
import PauseSvgIcon from '../assets/svgs/PauseSvgIcon';
import PlaySvgIcon from '../assets/svgs/PlaySvgIcon';
import {hp, wp} from '../utils/responsiveness';
import {MText} from './customText';

interface IFavListItem {
  item: FeedItem;
  onClickPlay: () => void;
  onToggleFav?: () => void;
  isFavourite?: Boolean;
  isCurrent?: Boolean;
}

export const FavListItem = ({
  item,
  onClickPlay,
  onToggleFav,
  isFavourite,
  isCurrent,
}: IFavListItem) => {
  return (
    <TouchableOpacity onPress={onClickPlay} style={styles.feedList}>
      <View>
        <MText numberOfLines={2} style={styles.feedTitle}>
          {item.title}
        </MText>
        <MText style={styles.feedDuration}>{item.itunes.duration}</MText>
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

        <TouchableOpacity onPress={onClickPlay}>
          {!isCurrent ? (
            <PauseSvgIcon style={styles.pause} />
          ) : (
            <PlaySvgIcon style={styles.pause} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
