import TrackPlayer from 'react-native-track-player';
import {create} from 'zustand';

interface ITrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
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
  seek30: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentPodcast: null,
  currentTrack: null,
  isPlaying: false,
  isPaused: false,
  favorites: [],
  playPodcast: podcast =>
    set({currentPodcast: podcast, isPlaying: true, isPaused: false}),
  pausePodcast: () => set({isPlaying: false, isPaused: true}),
  toggleFavorite: podcastId => {
    const {favorites} = get();
    if (favorites.includes(podcastId)) {
      set({favorites: favorites.filter(id => id !== podcastId)});
    } else {
      set({favorites: [...favorites, podcastId]});
    }
  },

  start: async (track: ITrack) => {
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

  seek30: async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 30);
  },
}));
