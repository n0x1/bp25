import { create } from 'zustand';
import { Place } from './types';


interface SettingsStore {
    places: Place[];
    vehicle: string;
    setPlaces: (newplaces: Place[]) => void;
    setVehicle: (newVehicles: string) => void;
}

const useSettingsStore = create<SettingsStore>((set) => ({
    places: [
        { id: 1, location: "Cadillac Mountain Summit", coords: { latitude: 44.3385, longitude: -68.2733 }, start: new Date(), end: new Date(), duration: 180 },
        { id: 2, location: "Jordan Pond", coords: { latitude: 44.3636, longitude: -68.2387 }, start: new Date(), end: new Date(), duration: 120 },
        { id: 3, location: "Thunder Hole", coords: { latitude: 44.3012, longitude: -68.2108 }, start: new Date(), end: new Date(), duration: 90 },
        { id: 4, location: "Sand Beach", coords: { latitude: 44.2300, longitude: -68.3000 }, start: new Date(), end: new Date(), duration: 60 },
        { id: 5, location: "Otter Cliff", coords: { latitude: 44.2500, longitude: -68.2600 }, start: new Date(), end: new Date(), duration: 75 },
        { id: 6, location: "Bass Harbor Head Light", coords: { latitude: 44.2850, longitude: -68.3800 }, start: new Date(), end: new Date(), duration: 50 },
        { id: 7, location: "Jordan Bay", coords: { latitude: 44.3700, longitude: -68.2200 }, start: new Date(), end: new Date(), duration: 110 },
    ],
    vehicle: 'car',
    setPlaces: (newPlaces) => set(() => ({ places: newPlaces })),
    setVehicle: (newVehicle) => set(() => ({ vehicle: newVehicle })),
}));

export default useSettingsStore;