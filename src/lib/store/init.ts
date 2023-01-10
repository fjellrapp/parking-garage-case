import { IGarageFloor, ParkingSpotType } from '../models/garage'

// The inital store
export const initial: IGarageFloor[] = [
	{
		name: 'Floor One',
		id: 1,
		capacity: 15,
		available: 8,
		spots: [
			{
				id: 1,
				type: ParkingSpotType.COMPACT,
				occupied: true,
				occupiedAtDateTime: new Date(2023, 0, 9, 3, 24, 0).getTime(),
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 2,
				type: ParkingSpotType.COMPACT,
				occupied: true,
				occupiedAtDateTime: new Date(2023, 0, 10, 5, 24, 0).getTime(),
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 3,
				type: ParkingSpotType.COMPACT,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 4,
				type: ParkingSpotType.LARGE,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 5,
				type: ParkingSpotType.LARGE,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 6,
				type: ParkingSpotType.LARGE,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 7,
				type: ParkingSpotType.HANDICAP,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 8,
				type: ParkingSpotType.HANDICAP,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 9,
				type: ParkingSpotType.MOTORCYCLE,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 1,
			},
			{
				id: 10,
				type: ParkingSpotType.MOTORCYCLE,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 1,
			},
		],
	},

	{
		name: 'Floor two',
		id: 2,
		capacity: 15,
		available: 5,
		spots: [
			{
				id: 20,
				type: ParkingSpotType.COMPACT,
				occupied: true,
				occupiedAtDateTime: new Date(2023, 0, 7, 3, 24, 0).getTime(),
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 21,
				type: ParkingSpotType.COMPACT,
				occupied: true,
				occupiedAtDateTime: new Date(2023, 0, 10, 2, 24, 0).getTime(),
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 22,
				type: ParkingSpotType.COMPACT,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 23,
				type: ParkingSpotType.LARGE,
				occupied: true,
				occupiedAtDateTime: new Date(2023, 0, 10, 6, 24, 0).getTime(),
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 24,
				type: ParkingSpotType.LARGE,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 25,
				type: ParkingSpotType.LARGE,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 26,
				type: ParkingSpotType.HANDICAP,
				occupied: true,
				occupiedAtDateTime: new Date(2023, 0, 5, 3, 24, 0).getTime(),
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 27,
				type: ParkingSpotType.HANDICAP,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 28,
				type: ParkingSpotType.MOTORCYCLE,
				occupied: true,
				occupiedAtDateTime: new Date(2023, 0, 5, 3, 24, 0).getTime(),
				duration: 0,
				fee: 0,
				floor: 2,
			},
			{
				id: 29,
				type: ParkingSpotType.MOTORCYCLE,
				occupied: false,
				occupiedAtDateTime: null,
				duration: 0,
				fee: 0,
				floor: 2,
			},
		],
	},
]
/** Adds new spots
 * @param {number} floor - The floor number
 * @param {number} currentSpotsLength - The current length of the spots array
 * @param {number} index - The index of the current spot
 */
export const initEmptyParkingspot = (floor: number, startingIndex: number) => {
	const emptySpot = {
		id: startingIndex + 1,
		type: null,
		occupied: false,
		occupiedAtDateTime: null,
		duration: 0,
		fee: 0,
		floor,
	}
	return emptySpot
}
