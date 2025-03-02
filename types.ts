export interface Place {
    id: number;
    location: string;
    coords: { latitude: number, longitude: number };
    start: Date;
    end: Date;
    duration: number; // in minutes
}