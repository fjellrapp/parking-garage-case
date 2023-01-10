import React, { useEffect } from 'react'
import { IParkingSpot, ParkingSpotTypeMapEnum } from '../../models/garage'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updateDuration, updateFee } from '../../store/slices/garageSlice'
import { millisecondsToHours } from 'date-fns'
import EditableContent from '../EditableContent'
import DrawerContainers from '../DrawerContainers'

interface IProps {
	isOpen: boolean
	spot: IParkingSpot | null
	onCancel: () => void
}
/**
 * The components will pop up when interacting with a parking spot,
 * and enables viewing and editing it.
 * @param isOpen Specifies if the drawer is open or not
 * @param spot an object of Ispot
 * @param onCancel Event handler for closing the drawer
 */
const Drawer: React.FC<IProps> = ({ isOpen, spot, onCancel }) => {
	const dispatch = useAppDispatch()
	/**
	 * The current selection in the store
	 */
	const currentState = useAppSelector(
		(state) => state.garageSlice.currentSelection
	)

	/**
	 * the useEffect hook is used to update the duration and fee when the drawer is opened.
	 * The duration is updated when the drawer is opened, and the fee is updated when the duration is updated.
	 */
	useEffect(() => {
		if (!currentState?.duration) {
			setUpdatedDurationAndCalculateRates()
		}
		if (currentState?.duration && !currentState.fee) {
			const fee =
				currentState.duration &&
				calculateFee(millisecondsToHours(currentState.duration))
			fee && dispatch(updateFee(fee))
		}
	}, [currentState])

	/**
	 * Updates the duration in the store, and calculates the fee.
	 */
	const setUpdatedDurationAndCalculateRates = () => {
		if (spot?.occupied && spot.occupiedAtDateTime) {
			// The time delta in milliseconds
			const timeDelta = getTimeDelta()
			// Dispatch the timedelta to the current selection in the store
			timeDelta && dispatch(updateDuration(timeDelta))
		}
	}

	/**
	 *
	 * @param hours The number of hours to calculate the fee for
	 * @returns The fee for the given number of hours
	 */
	const calculateFee = (hours: number) => {
		let fee = 0
		/** First checks if the hours are greater than zero */
		if (hours > 0) {
			/**  Adds 50 to the first hour*/
			fee += 50
			if (hours > 1) {
				/** If hours are greater than 1 (hours two and three). Add 30 to the fee. Multiply by either 2 or hours - 1.
				 * Whichever is smaller.
				 */
				fee += 30 * Math.min(2, hours - 1)
			}
			/** Adds the fee for the remaining hours */
			if (hours > 3) {
				fee += 10 * (hours - 3)
			}
		}
		return fee
	}

	/**
	 * @returns The time delta between now and the moment the parking space was occupied
	 */
	const getTimeDelta = () => {
		if (spot?.occupiedAtDateTime) {
			const now = Date.now()
			return Math.abs(now - spot.occupiedAtDateTime)
		}
	}
	return (
		<DrawerContainers isOpen={isOpen}>
			{/**
			 * I would could have used a modal here, but chose to make a drawer in order to view some of the content behind the drawer.
			 * I Could also have made some of these divs into components, but chose not to because of the small time budget.
			 */}
			<div className=" m-5 flex  content-center items-center justify-between">
				<div className="mr-4 flex gap-4 self-center">
					<h3 className="self-center text-2xl font-semibold">
						{/**
						 * The spot type is mapped to a string, and the floor is displayed.
						 */}
						{spot?.type ? ParkingSpotTypeMapEnum[spot.type] : 'New'}{' '}
						spot in floor {spot?.floor}
					</h3>
					{/**
					 * The spot is displayed as occupied or available.
					 */}
					<span
						className={` self-center rounded-lg p-2 font-semibold text-white  ${
							spot?.occupied ? 'bg-red-600' : 'bg-blue-600'
						}`}
					>
						{spot?.occupied ? 'Occupied' : 'Available'}
					</span>
				</div>
				{/**
				 * The close button.
				 */}
				<button
					title="Close"
					type="button"
					className="text-1xl rounded-full bg-slate-900 px-4 py-2 text-white"
					onClick={onCancel}
				>
					x
				</button>
			</div>

			{/**
			 * The main information about the spt is displayed here in EditableContent.
			 */}
			{spot && <EditableContent spot={spot} />}
		</DrawerContainers>
	)
}

export default Drawer
