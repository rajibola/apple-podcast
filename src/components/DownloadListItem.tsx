import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {DeleteIcon, PauseSvgIcon, PlaySvgIcon} from '../assets/svgs';
import {DownloadedFile} from '../store';
import {hp, wp} from '../utils';
import {MText} from './CustomText';
import FastImage from 'react-native-fast-image';

interface IDownloadListItem {
  item: DownloadedFile;
  onClickPlay: () => void;
  onDelete?: () => void;
  isCurrent?: Boolean;
}

export const DownloadListItem = ({
  item,
  onClickPlay,
  onDelete,
  isCurrent,
}: IDownloadListItem) => {
  return (
    <TouchableOpacity onPress={onClickPlay} style={styles.feedList}>
      <View style={styles.imageText}>
        <FastImage
          style={styles.listImage}
          source={{uri: item.artwork, priority: FastImage.priority.high}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View>
          <MText numberOfLines={2} style={styles.feedTitle}>
            {item.title}
          </MText>
          <MText style={styles.feedDuration}>{item.artist}</MText>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onDelete}>
          <DeleteIcon style={styles.pause} />
        </TouchableOpacity>
        {isCurrent ? (
          <TouchableOpacity>
            <PauseSvgIcon style={styles.playPause} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <PlaySvgIcon style={styles.playPause} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playPause: {
    width: wp(26),
    height: wp(24),
    color: 'white',
  },
  listImage: {
    width: wp(60.2),
    height: wp(56),
    backgroundColor: '#fff',
    borderRadius: wp(5),
    objectFit: 'cover',
  },
  current: {
    backgroundColor: '#242424',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: wp(200),
  },
  feedList: {
    padding: hp(5),
    paddingVertical: hp(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(10),
  },
});
