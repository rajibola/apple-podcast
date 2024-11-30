import axios from 'axios';
import RSSParser from 'react-native-rss-parser';

const BASE_URL = 'https://itunes.apple.com/search';

export interface Podcast {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export const searchPodcasts = async (query: string): Promise<Podcast[]> => {
  const response = await axios.get(
    `${BASE_URL}?term=${query}&media=podcast&entity=podcast`,
  );
  return response.data.results as Podcast[];
};

export const getPodcastDetails = async (podcastId: string) => {
  const response = await axios.get(
    `${BASE_URL}?id=${podcastId}&entity=podcast`,
  );
  return response.data.results[0];
};

export const getFeedUrlServices = async (feedUrl: string) => {
  const response = await axios.get(feedUrl);
  return await RSSParser.parse(response.data);
};
