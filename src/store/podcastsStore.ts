import {create} from 'zustand';
import {getFeedUrlServices, Podcast, searchPodcasts} from '../api/applePodcast';
import {Feed} from 'react-native-rss-parser';

interface PodcastsState {
  podcasts: Podcast[];
  feed: Feed | null;
  cachedResults: Record<string, Podcast[]>;
  cachedFeeds: Record<string, Feed | null>;
  setFeed: (feed: Feed | null) => void;
  searchPodcast: (query: string) => Promise<void>;
  loadFeed: (feedUrl: string) => Promise<void>;
}

const usePodcastsStore = create<PodcastsState>((set, get) => ({
  podcasts: [],
  feed: null, // Initialize feed as null
  cachedResults: {},
  cachedFeeds: {},
  setFeed: feed => set({feed}), // Update feed state
  searchPodcast: async (query: string) => {
    if (query in get().cachedResults) {
      set({podcasts: get().cachedResults[query]});
      return;
    }

    try {
      const results = await searchPodcasts(query);

      set(state => {
        const newCache = {...state.cachedResults, [query]: results};
        return {podcasts: results, cachedResults: newCache};
      });
    } catch (error) {
      console.error('Error searching podcasts:', error);
    }
  },
  loadFeed: async (feedUrl: string) => {
    // Check if feed is already cached
    if (feedUrl in get().cachedFeeds) {
      get().setFeed(get().cachedFeeds[feedUrl]);
      return;
    }

    try {
      const feed = await getFeedUrlServices(feedUrl);

      set(state => {
        const newCache = {...state.cachedFeeds, [feedUrl]: feed};
        return {cachedFeeds: newCache, feed}; // Set feed directly
      });
    } catch (error) {
      console.error('Error loading feed:', error);
      set({feed: null}); // Handle error by setting feed to null
    }
  },
}));

export default usePodcastsStore;
