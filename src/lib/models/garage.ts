export interface IGarageFloor {
	name: string
	capacity: number
	available: number
	spots: IParkingSpot[]
}

/**
 * type: The parking spot type
 * occupied: Determines if a spot is occupied or not
 * duration: Total duration calculated from occupationStartedAt and occupationEndedAt
 * occupationStartedAt: Is a date that is set when the spot gets occupied
 * occupationEndedAt: Is a date that is set when the occupation ends.
 * currentRate: Is calculated from the duration
 */
export interface IParkingSpot {
	type: ParkingSpotType
	occupied: boolean
	duration: number
	occupationStartedAt: Date | null
	occupationEndedAt: Date | null
	currentRate: number
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
