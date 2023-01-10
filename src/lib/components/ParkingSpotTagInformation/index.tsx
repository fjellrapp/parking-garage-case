import React from 'react'
/**
 *  Displays the information about the parking spot tags
 * @returns {JSX.Element}
 */
const ParkingSpotTagInformation = () => (
	<div className="flex justify-end gap-3">
		<span
			className={`h-fit w-fit rounded-md bg-red-600 p-2 font-semibold text-white`}
		>
			Occupied
		</span>
		<span className="h-fit w-fit rounded-md bg-blue-600 p-2 font-semibold text-white">
			Available
		</span>
	</div>
)

export default ParkingSpotTagInformation
