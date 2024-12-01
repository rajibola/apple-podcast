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

      console.log('Playback state changed:', state); // Debug log

      if (state === State.Playing) {
        console.log('State is Playing');
        updateState.playPodcast(updateState.currentPodcast || '');
      } else if (state === State.Paused) {
        console.log('State is Paused');
        updateState.pausePodcast();
      } else {
        console.log('State is neither Playing nor Paused:', state);
        updateState.pausePodcast();
      }
    },
  );
};
