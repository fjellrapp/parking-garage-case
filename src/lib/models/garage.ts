export interface IGarageFloor {
	name: string
	capacity: number
	available: number
	spots: IParkingSpot[]
}

/**
 * @property type: The parking spot type
 * @property occupied: Determines if a spot is occupied or not
 * @property duration: Total duration calculated from occupationStartedAt and occupationEndedAt
 * @property occupiedAtDateTime: Is a date that is set when the spot gets occupied
 * @property fee: Is calculated from the duration
 * @property floor
 */
export interface IParkingSpot {
	type: ParkingSpotType
	occupied: boolean
	duration: number
	occupiedAtDateTime: number | null
	fee: number
	floor: number
}

/** Each parking spot type is defined as enums */
export enum ParkingSpotType {
	COMPACT = 1,
	LARGE = 2,
	HANDICAP = 3,
	MOTORCYCLE = 4,
}

export enum ParkingSpotTypeMapEnum {
	'Compact' = 1,
	'Large' = 2,
	'HC' = 3,
	'MC' = 4,
}
