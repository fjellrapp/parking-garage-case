import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGarageFloor, IParkingSpot } from '../../models/garage'
import { initial } from '../init'

/**
 * Garage Store
 */

interface GarageStore {
	// The garage floors
	garage: IGarageFloor[]
	// The current selection
	currentSelection: IParkingSpot | null
	// The new selection
	newSelection: IParkingSpot | null
}
/**
 * The initial state of the store
 */
const initialState: GarageStore = {
	garage: initial,
	currentSelection: null,
	newSelection: null,
}

// Reducers
/**
 * @param state GarageStore
 * @param action PayloadAction<IParkingSpot>
 */
const addNewSpotReducer = (
	state: GarageStore,
	action: PayloadAction<IParkingSpot>
) => {
	// Get the floor index
	const { floor } = action.payload
	const floorIndex = state.garage.findIndex((f) => f.id === floor)
	// If the floor exists, update the new selection
	if (floorIndex !== -1) {
		state.newSelection = action.payload
	}
}
/**
 * @param state GarageStore
 * @param action PayloadAction<IParkingSpot>
 */
const saveNewSpotReducer = (
	state: GarageStore,
	action: PayloadAction<IParkingSpot>
) => {
	/**
	 * Get the floor index
	 */
	const { floor } = action.payload
	const floorIndex = state.garage.findIndex((f) => f.id === floor)
	// If the floor exists, add the new spot, update the available count, and clear the new selection
	if (floorIndex !== -1) {
		state.garage[floorIndex].spots.push(action.payload)
		state.garage[floorIndex].available += 1
		state.newSelection = null
	}
}
/**
 * @param state GarageStore
 * @param action PayloadAction<IParkingSpot>
 */
const addCurrentSelectionReducer = (
	state: GarageStore,
	action: PayloadAction<IParkingSpot>
) => {
	// Update the current selection
	state.currentSelection = action.payload
}

const removeCurrentSelectionReducer = (state: GarageStore) => {
	// Clear the current selection
	state.currentSelection = null
}

const cancelNewSpotReducer = (state: GarageStore) => {
	// Clear the new selection
	state.newSelection = null
}

const updateDurationReducer = (
	state: GarageStore,
	action: PayloadAction<number>
) => {
	// Update the duration of the current selection
	if (state.currentSelection) {
		state.currentSelection.duration = action.payload
	}
}

const updateFeeReducer = (
	state: GarageStore,
	action: PayloadAction<number>
) => {
	// Update the fee of the current selection
	if (state.currentSelection) {
		state.currentSelection.fee = action.payload
	}
}

const updateSpotTypeReducer = (
	state: GarageStore,
	action: PayloadAction<number>
) => {
	// Update the spot type of the current selection
	if (state.currentSelection) {
		// Find the floor, and then the spot.
		const floor = state.garage.find(
			(f) => f.id === state.currentSelection?.floor
		)
		if (floor?.spots.length) {
			const spot = floor.spots.find(
				(s) => s.id === state.currentSelection?.id
			)
			// If the spot exists, update the type
			if (spot) {
				spot.type = action.payload
			}
		}
	}
}

// Slice
export const garageSlice = createSlice({
	name: 'garage',
	initialState,
	reducers: {
		addCurrentSelection: addCurrentSelectionReducer,
		removeCurrentSelection: removeCurrentSelectionReducer,
		cancelNewSpot: cancelNewSpotReducer,
		updateDuration: updateDurationReducer,
		updateFee: updateFeeReducer,
		updateSpotType: updateSpotTypeReducer,
		addNewSpot: addNewSpotReducer,
		saveNewSpot: saveNewSpotReducer,
	},
})
export const {
	addNewSpot,
	addCurrentSelection,
	removeCurrentSelection,
	cancelNewSpot,
	updateDuration,
	updateFee,
	updateSpotType,
	saveNewSpot,
} = garageSlice.actions

export default garageSlice.reducer
