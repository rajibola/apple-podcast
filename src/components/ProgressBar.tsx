import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {StyleSheet} from 'react-native';

export const ProgressBar = () => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  const progress = useProgress();
  const {duration, position} = progress;

  const handleSlidingStart = (value: number) => {
    setIsSeeking(true);
    setSeekValue(value);
    TrackPlayer.pause();
  };

  const handleSlidingComplete = async (value: number) => {
    await TrackPlayer.seekTo(value);
    await TrackPlayer.play();
    setIsSeeking(false);
  };

  return (
    <Slider
      style={styles.slider}
      minimumValue={0}
      maximumValue={duration}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      value={isSeeking ? seekValue : position}
      onValueChange={setSeekValue}
      onSlidingStart={handleSlidingStart}
      onSlidingComplete={handleSlidingComplete}
    />
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
});
