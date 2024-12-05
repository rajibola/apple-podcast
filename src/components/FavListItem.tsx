import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FeedItem} from 'react-native-rss-parser';
import {
  FavIcon,
  FilledFavIcon,
  PauseSvgIcon,
  PlaySvgIcon,
} from '../assets/svgs';
import {hp, wp} from '../utils';
import {MText} from './CustomText';
import FastImage from 'react-native-fast-image';

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
      <View style={styles.imageText}>
        <FastImage
          style={styles.listImage}
          source={{uri: item.itunes.image, priority: FastImage.priority.high}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View>
          <MText numberOfLines={2} style={styles.feedTitle}>
            {item.title}
          </MText>
          <MText style={styles.feedDuration}>{item.itunes.duration}</MText>
        </View>
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
          {isCurrent ? (
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
  listImage: {
    width: wp(60.2),
    height: wp(56),
    backgroundColor: '#fff',
    borderRadius: wp(5),
    objectFit: 'cover',
  },
  imageText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(10),
  },
  current: {
    backgroundColor: '#242424',
  },
  buttons: {
    flexDirection: 'row',
    gap: wp(10),
  },
  pause: {color: '#fff', width: wp(26), height: wp(24)},
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
    width: wp(200),
  },
  feedList: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
