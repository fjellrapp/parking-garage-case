import React from 'react'
/**
 * @param {number} availabilityAllFloors
 * @param {number} totalSpots
 * @returns {JSX.Element}
 */
interface IProps {
	availabilityAllFloors: number
	totalSpots: number
}
/**
 * Displays the current availability on all floors
 */
const CurrentAvailabilityHeader: React.FC<IProps> = ({
	availabilityAllFloors,
	totalSpots,
}) => {
	return (
		<h3 className="text-md font-semibold">
			Current availability on all floors:{' '}
			<span className=" font-bold">
				{availabilityAllFloors} / {totalSpots}
			</span>
		</h3>
	)
}
export default CurrentAvailabilityHeader
