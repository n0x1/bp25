import { Place } from "@/types";

export interface ScheduleItem {
    place: Place,
    arrivalTime: Date,
    departureTime: Date,
}

const createSchedule = (startTime: number, places: Place[], start: Place, end:Place): ScheduleItem[] => {
    // Prioritize place with earliest opening hour.
    
    const distanceMatrix = getDistanceMatrix(places);
    // CHANGE: Assume the optimal path is the given path
    // places = findOptimalPath(places, distanceMatrix) ?? places;

    let currentTime = startTime;
    let schedule: ScheduleItem[] = [];

    for(let i = 0; i < places.length; i++) {
        const arrivalTime = currentTime + distanceMatrix[places[i].id][places[i+1].id??end.id];
        // CHANGE: Assume the place is open when you arrive
        // const startTime = Math.max(arrivalTime, timeInMinutes(places[i].start)); 
        const departureTime = arrivalTime + places[i].duration;

        schedule.push({
            place: places[i],
            arrivalTime: minutesToTime(arrivalTime),
            // start: startTime,
            departureTime: minutesToTime(departureTime),
        });

        currentTime = departureTime;
    }

    return schedule;
}

function findDistance(coords1: Place["coords"], coords2: Place["coords"]) {
    return 1 // CHANGE: Placeholder
}
function getDistanceMatrix(places: Place[]): number[][] {
    const n = places.length;
    const matrix:number[][] = []

    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = findDistance(places[i].coords, places[j].coords);
        }
    }

    return matrix;
}

function timeInMinutes(time: Date) {
    return time.getHours() * 60 + time.getMinutes();
}

function minutesToTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return new Date(0, 0, 0, hours, mins);
}

//A* algorithm
function findOptimalPath(places: Place[], distanceMatrix: number[][]): Place[] | null {
    const start = places[0]; // CHANGE: Assume first place is the starting point
    const end = places[places.length - 1]; // CHANGE: Assume last place is the final destination

    type State = {
        currentPlace: Place;
        time: number;  // Current time in minutes from day start
        visited: Set<number>;
        path: Place[];
        cost: number;  // Total travel + visit time
    };

    const priorityQueue: State[] = [{
        currentPlace: start,
        time: timeInMinutes(start.start), // Convert start time to minutes
        visited: new Set([start.id]),
        path: [start],
        cost: 0 //Travel + wait time
    }];

    let bestPath: Place[] | null = null;
    let bestCost = Infinity;

    while (priorityQueue.length > 0) {
        priorityQueue.sort((a, b) => a.cost - b.cost); // Min-heap based on cost
        const { currentPlace, time, visited, path, cost } = priorityQueue.shift()!;

        if (visited.size === places.length) {
            if (cost < bestCost) {
                bestCost = cost;
                bestPath = path;
            }
            continue;
        }

        for (const nextPlace of places) {
            if (visited.has(nextPlace.id)) continue;

            const travelTime = distanceMatrix[currentPlace.id][nextPlace.id];
            const arrivalTime = time + travelTime;
            const waitTime = Math.max(0, timeInMinutes(nextPlace.start) - arrivalTime);
            const totalTime = arrivalTime + waitTime + nextPlace.duration;

            if (totalTime > timeInMinutes(nextPlace.end)) continue; // Skip invalid paths

            priorityQueue.push({
                currentPlace: nextPlace,
                time: totalTime,
                visited: visited.add(nextPlace.id),
                path: path.concat(nextPlace),
                cost: cost + travelTime + waitTime, 
            });
        }
    }

    return bestPath;
}

export default createSchedule;