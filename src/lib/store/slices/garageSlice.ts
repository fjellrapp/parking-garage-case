import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGarageFloor, IParkingSpot } from '../../models/garage'
import { initial } from '../init'

interface GarageStore {
	garage: IGarageFloor[]
	currentSelection: IParkingSpot | null
}

const initialState: GarageStore = {
	garage: initial,
	currentSelection: null,
}

// Reducers

const addNewSpotReducer = (
	state: GarageStore,
	action: PayloadAction<IParkingSpot>
) => {
	const { floor } = action.payload
	const floorIndex = state.garage.findIndex((f) => f.id === floor)
	if (floorIndex !== -1) {
		state.garage[floorIndex].spots.push(action.payload)
		state.garage[floorIndex].available += 1
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

// Slice
export const garageSlice = createSlice({
	name: 'garage',
	initialState,
	reducers: {
		addCurrentSelection: addCurrentSelectionReducer,
		removeCurrentSelection: removeCurrentSelectionReducer,
		updateDuration: updateDurationReducer,
		updateFee: updateFeeReducer,
		addNewSpot: addNewSpotReducer,
	},
})
export const {
	addNewSpot,
	addCurrentSelection,
	removeCurrentSelection,
	updateDuration,
	updateFee,
} = garageSlice.actions
export default garageSlice.reducer
