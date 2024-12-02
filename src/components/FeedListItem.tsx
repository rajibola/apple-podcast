import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FeedItem} from 'react-native-rss-parser';
import DownloadIcon from '../assets/svgs/DownloadIcon';
import PauseSvgIcon from '../assets/svgs/PauseSvgIcon';
import {DownloadElement} from '../store/downloadStore';
import {usePlayerStore} from '../store/playerStore';
import {hp, wp} from '../utils/responsiveness';
import {MText} from './customText';

interface IFeedListItem {
  item: FeedItem;
  artistName: string;
  onClickDownload: (feedItem: FeedItem) => void;
  downloadElement?: DownloadElement;
}

export const FeedListItem = ({
  item,
  artistName,
  onClickDownload,
  downloadElement,
}: IFeedListItem) => {
  const playstore = usePlayerStore();
  return (
    <TouchableOpacity
      onPress={async () => {
        playstore.start({
          id: item.id,
          url: item.enclosures[0].url,
          title: item.title,
          artist: artistName,
          artwork: item.itunes.image,
          duration: item.itunes.duration,
        });
      }}
      style={styles.feedList}>
      <MText style={styles.feedTitle}>{item.title}</MText>
      <MText style={styles.feedDuration}>{item.itunes.duration}</MText>
      {downloadElement ? (
        <TouchableOpacity onPress={() => onClickDownload(item)}>
          <PauseSvgIcon
            style={{color: '#fff', width: wp(20), height: wp(20)}}
          />
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
