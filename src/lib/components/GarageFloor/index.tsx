import React, { Fragment, useEffect, useState } from 'react'
import { IGarageFloor, IParkingSpot } from '../../models/garage'
import ParkingSpot from '../ParkingSpot'
import { initEmptyParkingspot } from '../../store/init'

interface IProps {
	floor: IGarageFloor
}
const GarageFloor: React.FC<IProps> = ({ floor }) => {
	const [newSpots, setNewSpots] = useState<IParkingSpot[]>([])
	const available = floor.available
	const capacity = floor.capacity
	const canCreateNSpots = floor.capacity - floor.spots.length
	console.log(floor.capacity, floor.spots.length)

	const createNSpots = (n: number): IParkingSpot[] => {
		const spots = []
		for (let i = 0; i < n; i++) {
			spots.push(initEmptyParkingspot(floor.id, floor.spots.length, i))
		}

		return spots
	}

	useEffect(() => {
		const createdSpots = createNSpots(canCreateNSpots)
		if (createdSpots.length) {
			setNewSpots(createdSpots)
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
				{floor.spots.map((spot) => (
					<Fragment key={spot.id}>
						<ParkingSpot spot={spot} />
					</Fragment>
				))}
				{canCreateNSpots > 0 &&
					newSpots.length &&
					newSpots.map((spot) => (
						<Fragment key={spot.id}>
							<ParkingSpot spot={spot} newSpot />
						</Fragment>
					))}
			</div>
		</div>
	)
}

export default GarageFloor
