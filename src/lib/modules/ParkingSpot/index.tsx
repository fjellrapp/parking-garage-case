import { useAppDispatch, useAppSelector } from '../../hooks'
import { IParkingSpot, ParkingSpotTypeMapEnum } from '../../models/garage'
import React from 'react'
import { addCurrentSelection, addNewSpot } from '../../store/slices/garageSlice'
/**
 * The parking spot component is used to display a parking spot in the garage.
 */
interface IProps {
	spot: IParkingSpot
}
/**
 * @param spot an object of IParkingSpot
 */
const ParkingSpot: React.FC<IProps> = ({ spot }) => {
	const dispatch = useAppDispatch()
	// Extract the name of the parking spot type
	const title = spot?.type && ParkingSpotTypeMapEnum[spot.type]

	// The currentSelection variable is used to select the currect selection in the store.

	const currentSelection = useAppSelector(
		(state) => state.garageSlice.currentSelection
	)

	// Check if the current spot is selected
	const isSelected = currentSelection?.id === spot.id

	// The currentlySelectedStyles function is used to determine the styles of the parking spot
	const currentlySelectedStyles = (): string => {
		if (isSelected) {
			return `outline outline-2 outline-offset-2 ${
				spot.occupied ? 'outline-red-600' : ' outline-blue-600'
			}`
		}
		return ''
	}

	// The parking spot component returns a button to represent the parking spot, with the appropriate styles
	return (
		<div className="my-1 mx-4">
			{
				// If the spot is new, display the add button, otherwise display the button as a parking spot
			}
			{!spot.type ? (
				<button
					className={`h-10 w-24 min-w-full rounded-md border-none p-2 text-xs leading-relaxed text-white text-black outline-dotted outline-2 outline-gray-700 hover:outline-4 ${currentlySelectedStyles()} `}
					onClick={() => spot && dispatch(addNewSpot(spot))}
				>
					Add
				</button>
			) : (
				<button
					className={`h-10 w-24 min-w-full rounded-md border-none p-2 text-xs font-semibold leading-relaxed text-white ${currentlySelectedStyles()} ${
						spot.occupied
							? 'bg-red-600 hover:bg-red-800'
							: ' bg-blue-600 hover:bg-blue-800'
					}`}
					onClick={() => dispatch(addCurrentSelection(spot))}
				>
					{title}
				</button>
			)}
		</div>
	)
}

export default ParkingSpot
