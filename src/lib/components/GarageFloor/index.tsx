import React, { Fragment } from 'react'
import { IGarageFloor } from '../../models/garage'
import ParkingSpot from '../ParkingSpot'

interface IProps {
	floor: IGarageFloor
}
const GarageFloor: React.FC<IProps> = ({ floor }) => {
	const totalAvailable = floor.available
	const total = floor.spots.length
	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between">
				<h2 className="mb-4 font-semibold">{floor.name}</h2>
				<div className="mb-3 text-xs">
					<p>
						Available: {totalAvailable}/{total}
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2">
				{floor.spots.map((spot, index) => (
					<Fragment key={`${floor.name}-spot-${index}`}>
						<ParkingSpot spot={spot} />
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default GarageFloor
