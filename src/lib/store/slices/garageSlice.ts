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

// Slice
export const garageSlice = createSlice({
	name: 'garage',
	initialState,
	reducers: {
		addCurrentSelection: addCurrentSelectionReducer,
		removeCurrentSelection: removeCurrentSelectionReducer,
	},
})
export const { addCurrentSelection, removeCurrentSelection } =
	garageSlice.actions
export default garageSlice.reducer
