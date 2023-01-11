import React from 'react'
interface IProps {
	available: number
	capacity: number
	floorName: string
}
const GarageFloorHeading: React.FC<IProps> = ({
	available,
	capacity,
	floorName,
}) => {
	return (
		<div className="flex items-center justify-between">
			<h2 className="mb-4 font-semibold">{floorName}</h2>
			<div className="mb-3 text-xs">
				<p>
					Available: {available}/{capacity}
				</p>
			</div>
		</div>
	)
}

export default GarageFloorHeading
