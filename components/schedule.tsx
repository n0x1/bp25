export interface Place {
    name: string,
    openingHour: number,
    closingHour: number,
    visitDuration: number,
    travelDuration: number;
}

export interface ScheduleItem {
    place: string,
    arrivalTime: number,
    departureTime: number,
}

const getSchedule = (startTime: number, places: Place[]): ScheduleItem[] => {
    // Prioritize place with earliest opening hour.
    places.sort((a, b) => a.openingHour - b.openingHour);

    let currentTime = startTime;
    let schedule: ScheduleItem[] = [];

    places.forEach((place) => {
        let arrivalTime = currentTime + place.travelDuration;
        let departureTime = arrivalTime + place.visitDuration;

        schedule.push({
            place: place.name,
            arrivalTime: arrivalTime,
            departureTime: departureTime,
        });

        currentTime = departureTime;
    });

    return schedule;
}

export default getSchedule;