import { createSlice } from '@reduxjs/toolkit'
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

export const garageSlice = createSlice({
	name: 'garage',
	initialState,
	reducers: {},
})

export default garageSlice.reducer
