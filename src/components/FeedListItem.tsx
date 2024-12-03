import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FeedItem} from 'react-native-rss-parser';
import DownloadIcon from '../assets/svgs/DownloadIcon';
import PauseSvgIcon from '../assets/svgs/PauseSvgIcon';
import {DownloadElement} from '../store/downloadStore';
import {hp, wp} from '../utils/responsiveness';
import {MText} from './customText';

interface IFeedListItem {
  item: FeedItem;
  onClickDownload: (feedItem: FeedItem) => void;
  downloadElement?: DownloadElement;
  onClickPlay: () => void;
}

export const FeedListItem = ({
  item,
  onClickDownload,
  downloadElement,
  onClickPlay,
}: IFeedListItem) => {
  return (
    <TouchableOpacity onPress={onClickPlay} style={styles.feedList}>
      <MText style={styles.feedTitle}>{item.title}</MText>
      <MText style={styles.feedDuration}>{item.itunes.duration}</MText>
      {downloadElement ? (
        <TouchableOpacity onPress={() => onClickDownload(item)}>
          <PauseSvgIcon style={styles.pause} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onClickDownload(item)}>
          <DownloadIcon />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pause: {color: '#fff', width: wp(20), height: wp(20)},
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
  },
  feedList: {
    padding: hp(5),
    paddingVertical: hp(8),
    borderBottomWidth: hp(0.5),
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});
