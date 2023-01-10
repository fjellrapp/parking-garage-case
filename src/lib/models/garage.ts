/**
 * @property name: The name of the garage
 * @property id: The id of the garage
 * @property capacity: The total capacity of the garage
 * @property available: The total available spots in the garage
 * @property spots: An array of parking spots
 * @property floors: An array of floors
 */
export interface IGarageFloor {
	name: string
	id: number
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
	id: number
	type: ParkingSpotTypeEnum | null
	occupied: boolean
	duration: number
	occupiedAtDateTime: number | null
	fee: number
	floor: number
}

/**
 * This is an enum that is used to determine the type of parking spot
 *
 */
export enum ParkingSpotTypeEnum {
	COMPACT = 1,
	LARGE = 2,
	HANDICAP = 3,
	MOTORCYCLE = 4,
}
/**
 * This is a map enum that is used to map the ParkingSpotTypeEnum enum to a string
 */
export enum ParkingSpotTypeMapEnum {
	'Compact' = 1,
	'Large' = 2,
	'HC' = 3,
	'MC' = 4,
}
