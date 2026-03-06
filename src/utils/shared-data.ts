import { create } from "zustand";

interface initialData {
    sharedData: string
}

type ShareData = {
    setSharedData: (data: string) => void
}

export const useSharedDataStore = create<initialData & ShareData>((set) => ({
    sharedData: '',
    setSharedData: (data) => set(() => ({ sharedData: data }))
}))
