import type { FoodItem } from '@/models/backend_models';
import { create } from 'zustand'

interface BackendQueryListStore {
    queryList: FoodItem[];
    populateBackendQueryList: (currentList: FoodItem[]) => void;
}

interface CurrentSelectedItemStore {
    selectedFoodItem: FoodItem;
    setSelectedFoodItem: (item: FoodItem) => void;
}

interface FilterStore {
    selectedDate: string | null;
    selectedLocations: string[];
    setSelectedDate: (date: string | null) => void;
    setSelectedLocations: (locations: string[]) => void;
}

export const filterStore = create<FilterStore>((set) => ({
    selectedDate: null,
    selectedLocations: [],
    setSelectedDate: (date) => set({ selectedDate: date }),
    setSelectedLocations: (locations) => set({ selectedLocations: locations }),
}))

export const currentSelectedStore = create<CurrentSelectedItemStore>((set) => ({
    selectedFoodItem: {
        name: "Default",
        description: '',
        date: '',
        location: '',
        coordinates: { // actually leaflet doesnt support this notation
            lat: 40.0017,
            lng: -83.0160
        },
        address: ''
    },
    setSelectedFoodItem: (item: FoodItem) => {
        set({ selectedFoodItem: item })
    },
}))

export const queryStore = create<BackendQueryListStore>((set) => ({
    queryList: [], // init as empty
    populateBackendQueryList: (currentList: FoodItem[]) => {
        set({ queryList: currentList })
    },
}))