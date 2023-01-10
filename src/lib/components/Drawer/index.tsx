import React, { useEffect } from 'react'
import { IParkingSpot, ParkingSpotTypeMapEnum } from '../../models/garage'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updateDuration, updateFee } from '../../store/slices/garageSlice'
import { millisecondsToHours } from 'date-fns'
import EditableContent from '../EditableContent'

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
	const currentState = useAppSelector(
		(state) => state.garageSlice.currentSelection
	)
	const isNewSpot = spot?.type === null

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

	const setUpdatedDurationAndCalculateRates = () => {
		if (spot?.occupied && spot.occupiedAtDateTime) {
			// The time delta in milliseconds
			const timeDelta = getTimeDelta()
			// Dispatch the timedelta to the current selection in the store
			timeDelta && dispatch(updateDuration(timeDelta))
		}
	}

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

	const getTimeDelta = () => {
		// Return diff time between now and the moment the parking space was occupied
		if (spot?.occupiedAtDateTime) {
			const now = Date.now()
			return Math.abs(now - spot.occupiedAtDateTime)
		}
	}
	return (
		<div
			className={`fixed left-0 flex h-[40vh] w-screen justify-center rounded-t-2xl  bg-slate-200 shadow-2xl ${
				isOpen ? ' bottom-[0]' : 'hidden'
			}`}
		>
			<div className="flex w-full max-w-[1372px] flex-col">
				<div className=" m-5 flex  content-center items-center justify-between">
					<div className="mr-4 flex gap-4 self-center">
						<h3 className="self-center text-2xl font-semibold">
							{spot?.type
								? ParkingSpotTypeMapEnum[spot.type]
								: 'New'}{' '}
							spot in floor {spot?.floor}
						</h3>
						<span
							className={` self-center rounded-lg p-2 font-semibold text-white  ${
								spot?.occupied ? 'bg-red-600' : 'bg-blue-600'
							}`}
						>
							{spot?.occupied ? 'Occupied' : 'Available'}
						</span>
					</div>
					<button
						title="Close"
						className="text-1xl rounded-full bg-slate-900 px-4 py-2 text-white"
						onClick={onCancel}
					>
						x
					</button>
				</div>

				{spot && <EditableContent spot={spot} />}
			</div>
		</div>
	)
}

export default Drawer
