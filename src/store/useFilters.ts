import { create } from 'zustand';

interface FilterState {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  quartier?: string;
  searchQuery?: string;
}

interface FiltersStore {
  vehiculeFilters: FilterState;
  immobilierFilters: FilterState;
  materiauxFilters: FilterState;
  setVehiculeFilters: (filters: FilterState) => void;
  setImmobilierFilters: (filters: FilterState) => void;
  setMateriauxFilters: (filters: FilterState) => void;
  resetFilters: (type: 'vehicule' | 'immobilier' | 'materiaux') => void;
}

export const useFilters = create<FiltersStore>((set) => ({
  vehiculeFilters: {},
  immobilierFilters: {},
  materiauxFilters: {},
  setVehiculeFilters: (filters) =>
    set({ vehiculeFilters: filters }),
  setImmobilierFilters: (filters) =>
    set({ immobilierFilters: filters }),
  setMateriauxFilters: (filters) =>
    set({ materiauxFilters: filters }),
  resetFilters: (type) =>
    set((state) => ({
      ...state,
      [`${type}Filters`]: {},
    })),
}));
