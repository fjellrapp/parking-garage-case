import React from 'react'
import { IGarageFloor } from '../../models/garage'

interface IProps {
	floor: IGarageFloor
}
const GarageFloor: React.FC<IProps> = ({ floor }) => {
	return (
		<div className="flex flex-col">
			<h2 className="font-semibold">{floor.name}</h2>

			<div className="grid grid-cols-2">
				{floor.spots.map((spot, index) => (
					<div className="m-2" key={`${floor.name}-spot-${index}`}>
						{spot.type}
					</div>
				))}
			</div>
		</div>
	)
}

export default GarageFloor
