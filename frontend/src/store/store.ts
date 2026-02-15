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

// so we couldjust do it by state but apparently you can also do it by link like how other websites do it
// this may need the use of react router tho
interface userQueryParamStore {
    selectedDate: string,
    selectedCategory: string,
    selectedLocation: string,

}

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