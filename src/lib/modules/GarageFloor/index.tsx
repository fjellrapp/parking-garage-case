import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { IGarageFloor, IParkingSpot } from '../../models/garage'
import ParkingSpot from '../ParkingSpot'
import { initEmptyParkingspot } from '../../store/init'
/**
 * The GarageFloor component is used to display the floor in the garage.
 */
interface IProps {
	floor: IGarageFloor
}
/**
 * @param  floor an object of IGarageFloor
 */
const GarageFloor: React.FC<IProps> = ({ floor }) => {
	// The allSpots and newSpots are stored in the state, and updated when the user changes the value.
	const [allSpots, setAllSpots] = useState<IParkingSpot[]>([])
	const [newSpots, setNewSpots] = useState<IParkingSpot[]>([])

	// The available and capacity variables are used to display the available and capacity of the floor.
	const available = floor.available
	const capacity = floor.capacity

	// The canCreateNSpots variable is used to determine if we can create new spots or not.
	const canCreateNSpots = floor.capacity - floor.spots.length

	/**
	 *  The createSpots function is used to create new spots
	 * @returns {IParkingSpot | null}
	 */
	const createSpots = (): IParkingSpot | null => {
		if (!canCreateNSpots) return null
		const index = floor.spots[floor.spots.length - 1].id + 1
		return initEmptyParkingspot(floor.id, index)
	}
	// The useEffect hook is used to create a new "add"-spot when the floor.spots changes.
	useEffect(() => {
		if (floor.spots.length) {
			setAllSpots(floor.spots)
			createAndSetNewSpot()
		}
	}, [floor.spots])

	// The useEffect hook is used to create a new "add"-spot the first time, after canCreateNSpots changes.
	useEffect(() => {
		if (newSpots.length) return
		createAndSetNewSpot()
	}, [canCreateNSpots])

	// The useEffect hook is used to add the new spots to the allSpots array.
	useEffect(() => {
		if (newSpots.length && allSpots.length < capacity) {
			setAllSpots([...allSpots, ...newSpots])
		}
	}, [newSpots])

	// The createAndSetNewSpot function is used to create a new spot and set it in the state.
	const createAndSetNewSpot = useCallback(() => {
		const createdSpots = createSpots()
		if (createdSpots) {
			setNewSpots([createdSpots])
		}
	}, [canCreateNSpots])

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between">
				<h2 className="mb-4 font-semibold">{floor.name}</h2>
				<div className="mb-3 text-xs">
					<p>
						Available: {available}/{capacity}
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2">
				{
					// The allSpots array is mapped to display the spots.
				}
				{allSpots.map((spot) => (
					<Fragment key={spot.id}>
						<ParkingSpot spot={spot} />
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default GarageFloor
