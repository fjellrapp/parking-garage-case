import { IParkingSpot, ParkingSpotTypeMapEnum } from '../../models/garage'
import React from 'react'
interface IProps {
	spot: IParkingSpot
}
const ParkingSpot: React.FC<IProps> = ({ spot }) => {
	// Extract the name of the parking spot type
	const title = ParkingSpotTypeMapEnum[spot.type]
	return (
		<div className="my-1 mx-7">
			<button
				className={`w-15 h-8 min-w-full rounded-md border-none p-2 text-xs text-white ${
					spot.occupied ? ' bg-red-400' : ' bg-blue-400'
				}`}
			>
				{title}
			</button>
		</div>
	)
}

export default ParkingSpot
