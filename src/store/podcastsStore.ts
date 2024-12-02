import {Feed} from 'react-native-rss-parser';
import axios from 'axios';
import {create} from 'zustand';
import {BASE_URL, Podcast} from '../api/applePodcast';

export interface IFeedServices {
  getFeed(feedUrl: string): Promise<Feed>;
}

export interface ISearchPodcastServices {
  searchPodcast(term: string): Promise<Podcast[]>;
}

interface PodcastsState {
  podcasts: Map<number, Podcast>;
  feeds: Map<number, Feed>;
  searches: Map<string, number[]>;
  searchPodcast: (term: string) => Promise<Podcast[]>;
  fetchFeed: (podcast: Podcast) => Promise<Feed>;
}

export const usePodcastsStore = create<PodcastsState>((set, get) => ({
  podcasts: new Map(),
  feeds: new Map(),
  searches: new Map(),

  searchPodcast: async (term: string): Promise<Podcast[]> => {
    const {podcasts, searches} = get();

    // Return cached results if already searched
    if (searches.has(term)) {
      const podcastIds = searches.get(term)!;
      return podcastIds.map(id => podcasts.get(id)!);
    }

    // Fetch podcasts using Axios
    const response = await axios.get<Podcast[]>(
      `${BASE_URL}/api/search-podcast`,
      {
        params: {term},
      },
    );
    const fetchedPodcasts = response.data;

    // Update podcasts and searches
    set({
      podcasts: new Map(
        Array.from(podcasts).concat(
          fetchedPodcasts.map(p => [p.trackId, p] as const),
        ),
      ),
      searches: new Map(
        Array.from(searches).concat([
          [term, fetchedPodcasts.map(p => p.trackId)],
        ]),
      ),
    });

    return fetchedPodcasts;
  },

  fetchFeed: async (podcast: Podcast): Promise<Feed> => {
    const {feeds} = get();

    // Return cached feed if already fetched
    if (feeds.has(podcast.trackId)) {
      return feeds.get(podcast.trackId)!;
    }

    // Fetch feed using Axios
    const response = await axios.get<Feed>(`${BASE_URL}/api/fetch-feed`, {
      params: {feedUrl: podcast.feedUrl},
    });
    const feed = response.data;

    // Update feeds
    set({
      feeds: new Map([...feeds, [podcast.trackId, feed]]),
    });

    return feed;
  },
}));
