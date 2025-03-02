import { create } from 'zustand';
import { Place } from './types';


interface SettingsStore {
    places: Place[];
    setPlaces: (newplaces: Place[]) => void;
}

const useSettingsStore = create<SettingsStore>((set) => ({
    places: [
        { id: 1, location: "Central Park", coords: { latitude: 40.785091, longitude: -73.968285 }, start: new Date(), end: new Date(), duration: 120 },
        { id: 2, location: "Eiffel Tower", coords: { latitude: 48.858844, longitude: 2.294351 }, start: new Date(), end: new Date(), duration: 90 },
        { id: 3, location: "Great Wall of China", coords: { latitude: 40.431908, longitude: 116.570374 }, start: new Date(), end: new Date(), duration: 180 },
      ],
    setPlaces: (newPlaces) => set((state) => ({ places: newPlaces })),
}));

export default useSettingsStore;