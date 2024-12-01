import TrackPlayer, {
  State,
  STATE_PLAYING,
  STATE_PAUSED,
} from 'react-native-track-player';
import {usePlayerStore} from './src/store/playerStore';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener('remote-previous', () =>
    TrackPlayer.skipToPrevious(),
  );
  TrackPlayer.addEventListener('playback-state', ({state}) => {
    const updateState = usePlayerStore.getState();

    if (state === STATE_PLAYING) {
      updateState.playPodcast(updateState.currentPodcast || '');
    } else if (state === STATE_PAUSED) {
      updateState.pausePodcast();
    } else {
      updateState.pausePodcast(); // Handle other states as paused by default
    }
  });
};
