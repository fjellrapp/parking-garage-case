import React from 'react'
import Layout from './lib/components/Layout/LayoutMain'
import { useAppDispatch, useAppSelector } from './lib/hooks'
import GarageFloor from './lib/modules/GarageFloor'
import Heading from './lib/components/Heading'
import Drawer from './lib/modules/Drawer'
import {
	cancelNewSpot,
	removeCurrentSelection,
} from './lib/store/slices/garageSlice'
import CurrentAvailabilityHeader from './lib/components/CurrentAvailabilityHeader'
import ParkingSpotTagInformation from './lib/components/ParkingSpotTagInformation'
import LayoutFlexCol from './lib/components/Layout/LayoutFlexCol'
import LayoutGridMain from './lib/components/Layout/LayoutGridMain'

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
			<LayoutFlexCol classNames="gap-6">
				<Heading />

				<CurrentAvailabilityHeader
					totalSpots={totalSpots}
					availabilityAllFloors={availabilityAllFloors}
				/>

				<ParkingSpotTagInformation />

				<LayoutFlexCol classNames="items-center gap-10 md:flex-row">
					{garage.map((floor, index) => (
						<LayoutGridMain key={`${floor.name}-${index}`}>
							<GarageFloor floor={floor} />
						</LayoutGridMain>
					))}
				</LayoutFlexCol>
			</LayoutFlexCol>
			<Drawer
				isOpen={Boolean(selectedParkingSpot || newSpot)}
				spot={selectedParkingSpot ?? newSpot}
				onCancel={handleCancel}
			/>
		</Layout>
	)
}

export default App
