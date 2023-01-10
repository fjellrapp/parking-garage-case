import React from 'react'
interface IProps {
	availabilityAllFloors: number
	totalSpots: number
}
const CurrentAvailabilityHeader: React.FC<IProps> = ({
	availabilityAllFloors,
	totalSpots,
}) => {
	return (
		<p className=" font-sans">
			Current availability on all floors:{' '}
			<span className=" font-bold">
				{availabilityAllFloors} / {totalSpots}
			</span>
		</p>
	)
}
export default CurrentAvailabilityHeader
