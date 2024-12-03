import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FeedItem} from 'react-native-rss-parser';
import {
  DownloadSvgIcon,
  FavIcon,
  PauseSvgIcon,
  FilledFavIcon,
} from '../assets/svgs';
import {DownloadElement} from '../store';
import {hp, wp} from '../utils';
import {MText} from './CustomText';

interface IFeedListItem {
  item: FeedItem;
  onClickDownload?: (feedItem: FeedItem) => void;
  downloadElement?: DownloadElement;
  onClickPlay: () => void;
  onToggleFav?: () => void;
  isFavourite?: Boolean;
  isPlaying?: Boolean;
}

export const FeedListItem = ({
  item,
  onClickDownload,
  downloadElement,
  onClickPlay,
  onToggleFav,
  isFavourite,
}: IFeedListItem) => {
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
        {onClickDownload && (
          <TouchableOpacity onPress={() => onClickDownload(item)}>
            {downloadElement ? (
              <PauseSvgIcon style={styles.pause} />
            ) : (
              <DownloadSvgIcon style={styles.pause} />
            )}
          </TouchableOpacity>
        )}
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
