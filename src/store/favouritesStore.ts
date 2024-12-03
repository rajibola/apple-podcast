import {FeedItem} from 'react-native-rss-parser';
import {create} from 'zustand';

interface FavouritesStore {
  favourites: Map<string, FeedItem>;
  addFavourite: (item: FeedItem) => void;
  removeFavourite: (id: string) => void;
}

const useFavouritesStore = create<FavouritesStore>(set => ({
  favourites: new Map(),

  addFavourite: item =>
    set(state => {
      const newFavourites = new Map(state.favourites);
      newFavourites.set(item.id, item);
      return {favourites: newFavourites};
    }),

  removeFavourite: id =>
    set(state => {
      const newFavourites = new Map(state.favourites);
      newFavourites.delete(id);
      return {favourites: newFavourites};
    }),
}));

export default useFavouritesStore;
