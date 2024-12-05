import TrackPlayer, {Track} from 'react-native-track-player';
import {create} from 'zustand';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isPaused: boolean;
  favorites: (string | number)[];
  playPodcast: (podcast: Track) => void;
  pausePodcast: () => void;
  toggleFavorite: (podcastId: string | number) => void;
  seekForward10: () => void;
  seekBackward10: () => void;
}

export const usePlayerStore = create<PlayerState>(set => ({
  currentTrack: null,
  isPlaying: false,
  isPaused: false,
  favorites: [],

  playPodcast: podcast =>
    set({currentTrack: podcast, isPlaying: true, isPaused: false}),

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

  seekForward10: async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  },

  seekBackward10: async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(Math.max(position - 10, 0));
  },
}));
