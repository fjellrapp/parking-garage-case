import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGarageFloor, IParkingSpot } from '../../models/garage'
import { initial } from '../init'

interface GarageStore {
	garage: IGarageFloor[]
	currentSelection: IParkingSpot | null
	newSelection: IParkingSpot | null
}

const initialState: GarageStore = {
	garage: initial,
	currentSelection: null,
	newSelection: null,
}

// Reducers

const addNewSpotReducer = (
	state: GarageStore,
	action: PayloadAction<IParkingSpot>
) => {
	const { floor } = action.payload
	const floorIndex = state.garage.findIndex((f) => f.id === floor)
	if (floorIndex !== -1) {
		state.newSelection = action.payload
	}
}

const saveNewSpotReducer = (
	state: GarageStore,
	action: PayloadAction<IParkingSpot>
) => {
	const { floor } = action.payload
	const floorIndex = state.garage.findIndex((f) => f.id === floor)
	if (floorIndex !== -1) {
		state.garage[floorIndex].spots.push(action.payload)
		state.garage[floorIndex].available += 1
		state.newSelection = null
	}
}
const addCurrentSelectionReducer = (
	state: GarageStore,
	action: PayloadAction<IParkingSpot>
) => {
	state.currentSelection = action.payload
}

const removeCurrentSelectionReducer = (state: GarageStore) => {
	state.currentSelection = null
}

const cancelNewSpotReducer = (state: GarageStore) => {
	state.newSelection = null
}

const updateDurationReducer = (
	state: GarageStore,
	action: PayloadAction<number>
) => {
	if (state.currentSelection) {
		state.currentSelection.duration = action.payload
	}
}

const updateFeeReducer = (
	state: GarageStore,
	action: PayloadAction<number>
) => {
	if (state.currentSelection) {
		state.currentSelection.fee = action.payload
	}
}

const updateSpotTypeReducer = (
	state: GarageStore,
	action: PayloadAction<number>
) => {
	if (state.currentSelection) {
		state.currentSelection.type = action.payload
		const floor = state.garage.find(
			(f) => f.id === state.currentSelection?.floor
		)
		if (floor?.spots.length) {
			const spot = floor.spots.find(
				(s) => s.id === state.currentSelection?.id
			)
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
