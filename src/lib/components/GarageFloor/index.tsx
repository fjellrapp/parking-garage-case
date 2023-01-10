import React, { Fragment, useEffect, useState } from 'react'
import { IGarageFloor, IParkingSpot } from '../../models/garage'
import ParkingSpot from '../ParkingSpot'
import { initEmptyParkingspot } from '../../store/init'

interface IProps {
	floor: IGarageFloor
}
const GarageFloor: React.FC<IProps> = ({ floor }) => {
	const [allSpots, setAllSpots] = useState<IParkingSpot[]>([])
	const [newSpots, setNewSpots] = useState<IParkingSpot[]>([])
	const available = floor.available
	const capacity = floor.capacity
	const canCreateNSpots = floor.capacity - floor.spots.length

	const createSpots = (): IParkingSpot | null => {
		if (!canCreateNSpots) return null
		const index = floor.spots[floor.spots.length - 1].id + 1
		return initEmptyParkingspot(floor.id, index)
	}

	useEffect(() => {
		if (floor.spots.length) {
			setAllSpots(floor.spots)
			createAndSetNewSpot()
		}
	}, [floor.spots])

	useEffect(() => {
		if (newSpots.length) return
		createAndSetNewSpot()
	}, [canCreateNSpots])

	useEffect(() => {
		if (newSpots.length && allSpots.length < capacity) {
			setAllSpots([...allSpots, ...newSpots])
		}
	}, [newSpots])

	const createAndSetNewSpot = () => {
		const createdSpots = createSpots()
		if (createdSpots) {
			setNewSpots([createdSpots])
		}
	}

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
