import { useAppDispatch, useAppSelector } from '../../hooks'
import { IParkingSpot, ParkingSpotTypeMapEnum } from '../../models/garage'
import React, { useEffect } from 'react'
import { addCurrentSelection, addNewSpot } from '../../store/slices/garageSlice'
interface IProps {
	spot: IParkingSpot
}
const ParkingSpot: React.FC<IProps> = ({ spot }) => {
	// Extract the name of the parking spot type
	const title = spot?.type && ParkingSpotTypeMapEnum[spot.type]
	const dispatch = useAppDispatch()
	const currentSelection = useAppSelector(
		(state) => state.garageSlice.currentSelection
	)

	useEffect(() => {
		console.log('update', spot.type)
	}, [spot.type])

	const isSelected = currentSelection?.id === spot.id

	const currentlySelectedStyles = (): string => {
		if (isSelected) {
			return `outline outline-2 outline-offset-2 ${
				spot.occupied ? 'outline-red-500' : ' outline-blue-500'
			}`
		}
		return ''
	}

	return (
		<div className="my-1 mx-7">
			{!spot.type ? (
				<button
					className={`w-15 h-8 min-w-full rounded-md border-none p-2 text-xs text-white text-black outline-dotted outline-2 outline-gray-700 ${currentlySelectedStyles()} `}
					onClick={() => spot && dispatch(addNewSpot(spot))}
				>
					Add
				</button>
			) : (
				<button
					className={`w-15 h-8 min-w-full rounded-md border-none p-2 text-xs text-white ${currentlySelectedStyles()} ${
						spot.occupied ? 'bg-red-500' : ' bg-blue-500'
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
