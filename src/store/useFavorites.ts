import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteItem {
  id: string;
  type: 'vehicule' | 'immobilier' | 'produitBTP';
  title: string;
  price: number;
  image?: string;
}

interface FavoritesStore {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (item) =>
        set((state) => {
          if (state.favorites.some((fav) => fav.id === item.id)) {
            return state;
          }
          return { favorites: [...state.favorites, item] };
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((fav) => fav.id === id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
