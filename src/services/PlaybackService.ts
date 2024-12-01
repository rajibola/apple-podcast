import TrackPlayer, {Event, State} from 'react-native-track-player';
import {usePlayerStore} from '../store/playerStore';

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext(),
  );
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious(),
  );
  TrackPlayer.addEventListener(
    Event.PlaybackState,
    ({state}: {state: State}) => {
      const updateState = usePlayerStore.getState();
      if (state === State.Playing) {
        updateState.playPodcast(updateState.currentPodcast || '');
      } else if (state === State.Paused) {
        updateState.pausePodcast();
      } else {
        updateState.pausePodcast();
      }
    },
  );
};
