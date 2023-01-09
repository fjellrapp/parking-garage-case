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
	},
})
export const {
	addCurrentSelection,
	removeCurrentSelection,
	updateDuration,
	updateFee,
} = garageSlice.actions
export default garageSlice.reducer
