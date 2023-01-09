import { createSlice } from '@reduxjs/toolkit'
import { IGarageFloor } from '../../models/garage'
import { initial } from '../init'

interface GarageStore {
	garage: IGarageFloor[]
}

const initialState: GarageStore = {
	garage: initial,
}

export const garageSlice = createSlice({
	name: 'garage',
	initialState,
	reducers: {},
})

export default garageSlice.reducer
