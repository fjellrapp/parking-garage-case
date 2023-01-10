import React from 'react'
import Layout from './lib/components/Layout'
import { useAppDispatch, useAppSelector } from './lib/hooks'
import GarageFloor from './lib/components/GarageFloor'
import Heading from './lib/components/Heading'
import Drawer from './lib/components/Drawer'
import {
	cancelNewSpot,
	removeCurrentSelection,
} from './lib/store/slices/garageSlice'
import CurrentAvailabilityHeader from './lib/components/CurrentAvailabilityHeader'

function App() {
	/** The garage selector. Maps a garage for each floor, given as input to <GarageFloor /> */
	const garage = useAppSelector((state) => state).garageSlice.garage
	/**
	 * The selected parking spot selector. This is the parking spot that is currently selected.
	 */
	const selectedParkingSpot = useAppSelector(
		(state) => state.garageSlice.currentSelection
	)
	/**
	 * The new parking spot selector. This is the new, unsaved parking spot that is currently selected.
	 */
	const newSpot = useAppSelector((state) => state.garageSlice.newSelection)
	/**
	 * The dispatch hook. This is used to dispatch actions to the store.
	 */
	const dispatch = useAppDispatch()

	/**
	 * The total number of available spots on all floors.
	 */
	const availabilityAllFloors = garage.reduce(
		(prev, curr) => curr.available + prev,
		0
	)
	/**
	 * The total number of spots on all floors.
	 */
	const totalSpots = garage.reduce((prev, curr) => curr.capacity + prev, 0)

	/**
	 * Event handler for cancelling the current selection.
	 */
	const handleCancel = () => {
		if (newSpot) {
			dispatch(cancelNewSpot())
		}
		if (selectedParkingSpot) {
			dispatch(removeCurrentSelection())
		}
	}

	return (
		<Layout>
			<div className="flex flex-col gap-6">
				<Heading />

				<CurrentAvailabilityHeader
					totalSpots={totalSpots}
					availabilityAllFloors={availabilityAllFloors}
				/>

				<div className="flex gap-3">
					<span
						className={`h-fit w-fit rounded-md bg-red-600 p-2 font-semibold text-white`}
					>
						Occupied
					</span>
					<span className="h-fit w-fit rounded-md bg-blue-600 p-2 font-semibold text-white">
						Available
					</span>
				</div>

				<div className="flex flex-col items-center gap-10 md:flex-row">
					{garage.map((floor, index) => (
						<div
							className={`grid min-w-[40vw] grid-rows-1 place-content-center place-items-center gap-10 bg-slate-50 p-10`}
							key={`${floor.name}-${index}`}
						>
							<GarageFloor floor={floor} />
						</div>
					))}
				</div>
			</div>
			<Drawer
				isOpen={Boolean(selectedParkingSpot || newSpot)}
				spot={selectedParkingSpot ?? newSpot}
				onCancel={handleCancel}
			/>
		</Layout>
	)
}

export default App
