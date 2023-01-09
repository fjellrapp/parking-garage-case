export interface IGarage {
    floor_one: IGarageFloor,
    floor_two: IGarageFloor
}

export interface IGarageFloor {
    capacity: number,
    available: number,
    spots: IParkingSpot[]
}

export interface IParkingSpot {
    type: ParkingSpotType,
    occupied: boolean,
    occupiedDuration: Date | null,
    currentRate: number
}

export enum ParkingSpotType {
    COMPACT = 1,
    LARGE = 2,
    HANDICAP = 3,
    MOTORCYCLE = 4
}

/**
 * Structuring the garage as a Map, where the key is the floor.
 */
export type GarageMap = Map<number, IGarageFloor>