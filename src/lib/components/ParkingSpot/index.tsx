import { useAppDispatch, useAppSelector } from '../../hooks'
import { IParkingSpot, ParkingSpotTypeMapEnum } from '../../models/garage'
import React from 'react'
import { addCurrentSelection, addNewSpot } from '../../store/slices/garageSlice'
interface IProps {
	spot: IParkingSpot
	newSpot?: boolean
}
const ParkingSpot: React.FC<IProps> = ({ newSpot, spot }) => {
	// Extract the name of the parking spot type
	const title = ParkingSpotTypeMapEnum[spot.type]
	const dispatch = useAppDispatch()
	const currentSelection = useAppSelector(
		(state) => state.garageSlice.currentSelection
	)

	const isSelected = currentSelection?.id === spot.id

	const currentlySelectedStyles = (): string => {
		if (isSelected) {
			return `outline outline-2 outline-offset-2 ${
				spot.occupied ? 'outline-red-400' : ' outline-blue-400'
			}`
		}
		return ''
	}

	return (
		<div className="my-1 mx-7">
			{newSpot ? (
				<button
					className={`w-15 h-8 min-w-full rounded-md border-none p-2 text-xs text-white text-black outline-dotted outline-2 outline-gray-700 ${currentlySelectedStyles()} `}
					onClick={() => dispatch(addNewSpot(spot))}
				>
					Add
				</button>
			) : (
				<button
					className={`w-15 h-8 min-w-full rounded-md border-none p-2 text-xs text-white ${currentlySelectedStyles()} ${
						spot.occupied ? 'bg-red-400' : ' bg-blue-400'
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
