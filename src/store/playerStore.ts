import { create } from "zustand";

interface PlayerState {
  currentPodcast: string | null;
  isPlaying: boolean;
  favorites: (string | number)[];
  playPodcast: (podcast: string) => void;
  pausePodcast: () => void;
  toggleFavorite: (podcastId: string | number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentPodcast: null,
  isPlaying: false,
  favorites: [],
  playPodcast: (podcast) => set({ currentPodcast: podcast, isPlaying: true }),
  pausePodcast: () => set({ isPlaying: false }),
  toggleFavorite: (podcastId) => {
    const { favorites } = get();
    if (favorites.includes(podcastId)) {
      set({ favorites: favorites.filter((id) => id !== podcastId) });
    } else {
      set({ favorites: [...favorites, podcastId] });
    }
  },
}));
