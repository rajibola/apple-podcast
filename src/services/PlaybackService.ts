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
    async ({state}: {state: State}) => {
      const updateState = usePlayerStore.getState();
      if (state === State.Playing) {
        const trackId = await TrackPlayer.getCurrentTrack();
        const currentTrack = await TrackPlayer.getTrack(trackId!);
        updateState.playPodcast(currentTrack!);
      } else if (state === State.Paused) {
        updateState.pausePodcast();
      } else {
        updateState.pausePodcast();
      }
    },
  );
};
