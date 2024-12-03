import TrackPlayer from 'react-native-track-player';
import {create} from 'zustand';
import usePodcastsStore from './podcastsStore';

interface ITrack {
  id?: string;
  title?: string;
  artist?: string;
  duration?: string;
  url: string;
  artwork?: string;
}

interface PlayerState {
  currentPodcast: string | null;
  currentTrack: ITrack | null;
  isPlaying: boolean;
  isPaused: boolean;
  favorites: (string | number)[];
  playPodcast: (podcast: string) => void;
  pausePodcast: () => void;
  toggleFavorite: (podcastId: string | number) => void;
  start: (track: ITrack) => Promise<void>;
  seekForward10: () => void;
  seekBackward10: () => void;
  skipToNextTrack: () => void;
  skipToPreviousTrack: () => void;
  playlistId: string | null;
  setPlaylistId: (id: string) => void;
}

export const usePlayerStore = create<PlayerState>(set => ({
  currentPodcast: null,
  currentTrack: null,
  isPlaying: false,
  isPaused: false,
  favorites: [],
  playlistId: null,

  setPlaylistId: (id: string) => set({playlistId: id}),

  playPodcast: podcast =>
    set({currentPodcast: podcast, isPlaying: true, isPaused: false}),

  pausePodcast: () => set({isPlaying: false, isPaused: true}),

  toggleFavorite: podcastId => {
    set(state => {
      const isFavorited = state.favorites.includes(podcastId);
      return {
        favorites: isFavorited
          ? state.favorites.filter(id => id !== podcastId)
          : [...state.favorites, podcastId],
      };
    });
  },

  start: async track => {
    set({currentTrack: track});
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: track.id,
      title: track.title,
      artist: track.artist,
      url: track.url,
      artwork: track.artwork,
    });
    await TrackPlayer.play();
  },

  seekForward10: async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  },

  seekBackward10: async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(Math.max(position - 10, 0));
  },

  skipToNextTrack: () => {
    handleTrackNavigation(1);
  },

  skipToPreviousTrack: () => {
    handleTrackNavigation(-1);
  },
}));

/**
 * Handles track navigation by offset.
 * @param offset - Offset to navigate tracks (-1 for previous, 1 for next).
 */
function handleTrackNavigation(offset: number) {
  const {currentTrack, playlistId} = usePlayerStore.getState();
  const {cachedFeeds} = usePodcastsStore.getState();

  if (!playlistId || !currentTrack) {
    return;
  }

  const currentFeed = cachedFeeds[playlistId];
  const currentIdx = Number(currentTrack.id);
  const newTrackIdx = currentIdx + offset;

  // Guard against out-of-bounds navigation
  if (!currentFeed?.items[newTrackIdx]) {
    return;
  }

  const newTrack = currentFeed.items[newTrackIdx];

  usePlayerStore.getState().start({
    id: String(newTrackIdx),
    url: newTrack.enclosures[0].url,
    title: newTrack.title,
    artist: newTrack.authors[0]?.name,
    artwork: newTrack.itunes.image,
    duration: newTrack.itunes.duration,
  });
}
