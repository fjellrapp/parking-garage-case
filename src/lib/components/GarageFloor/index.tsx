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

	const createNSpots = (n: number): IParkingSpot[] => {
		const spots = []
		for (let i = 0; i < n; i++) {
			const startingIndex = floor.spots[floor.spots.length - 1].id + 1
			spots.push(initEmptyParkingspot(floor.id, startingIndex, i))
		}
		return spots
	}

	useEffect(() => {
		if (floor.spots.length) {
			setAllSpots(floor.spots)
			const createdSpots = createNSpots(canCreateNSpots)
			if (createdSpots.length) {
				setNewSpots(createdSpots)
			}
		}
	}, [floor.spots])

	useEffect(() => {
		if (newSpots.length) return
		const createdSpots = createNSpots(canCreateNSpots)
		if (createdSpots.length) {
			setNewSpots(createdSpots)
		}
	}, [canCreateNSpots])

	useEffect(() => {
		if (newSpots.length && allSpots.length < capacity) {
			setAllSpots([...allSpots, ...newSpots])
		}
	}, [newSpots])

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
