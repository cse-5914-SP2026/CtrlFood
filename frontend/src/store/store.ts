import type { FoodItem } from '@/models/backend_models';
import { create } from 'zustand'

interface BackendQueryListStore {
    queryList: FoodItem[];
    populateBackendQueryList: (currentList: FoodItem[]) => void;
}


export const queryStore = create<BackendQueryListStore>((set) => ({
    queryList: [], // init as empty
    populateBackendQueryList: (currentList: FoodItem[]) => {
        set({ queryList: currentList })
    },
}))