import React from 'react'
import {
	IParkingSpot,
	ParkingSpotType,
	ParkingSpotTypeMapEnum,
} from '../../models/garage'
import { format, millisecondsToHours } from 'date-fns'
import ContentGroup from '../ContentGroup'
import { useAppDispatch } from '../../hooks'
import { updateFee, updateSpotType } from '../../store/slices/garageSlice'

interface IProps {
	spot: IParkingSpot
}

const EditableContent: React.FC<IProps> = ({ spot }) => {
	const [fee, editFee] = React.useState(spot.fee)
	const [type, editType] = React.useState(spot.type)
	const isNewSpot = spot?.type === null

	const dispatch = useAppDispatch()

	const handleEditFee = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fee = Number(e.target.value)
		isNewSpot && editFee(fee)
	}

	const handleCreateNewSpot = () => {
		type && dispatch(updateSpotType(type))
		fee && dispatch(updateFee(fee))
	}

	const handleEditType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const type = Number(e.target.value)
		!isNewSpot && editType(type)
	}
	return (
		<div className="mx-5 flex flex-col gap-5 overflow-y-auto pr-0 scrollbar scrollbar-thin scrollbar-track-slate-200  scrollbar-thumb-slate-300">
			<ContentGroup
				label="Occupied at"
				id="occupiedAtDateTime"
				type="date"
				onChange={() => console.log('cah')}
			>
				{spot.occupiedAtDateTime
					? format(spot.occupiedAtDateTime, 'dd.MM.yyyy hh:mm')
					: 'Not occupied'}
			</ContentGroup>
			<ContentGroup
				label="Duration"
				id="duration"
				type="number"
				onChange={() => console.log('cah')}
			>
				{millisecondsToHours(spot.duration)} hours
			</ContentGroup>

			<ContentGroup
				label="Current rate"
				id="rate"
				editableContent={fee}
				type="number"
				onChange={(e) =>
					handleEditFee(e as React.ChangeEvent<HTMLInputElement>)
				}
				onSave={() => dispatch(updateFee(fee))}
			>
				NOK {spot?.fee},-
			</ContentGroup>
			<ContentGroup
				label="Parking spot type"
				id="type"
				editableContent={type}
				type="select"
				onChange={(e) =>
					handleEditType(e as React.ChangeEvent<HTMLSelectElement>)
				}
				onSave={() => dispatch(updateSpotType(type as ParkingSpotType))}
			>
				{spot?.type && ParkingSpotTypeMapEnum[spot.type]}
			</ContentGroup>
			{isNewSpot && (
				<div className="m-5 flex justify-end">
					<button
						title="Submit"
						className="rounded-full bg-blue-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-blue-900 disabled:hover:bg-gray-500"
						onClick={() => handleCreateNewSpot()}
						disabled={Boolean(!type && !fee)}
					>
						Submit
					</button>
				</div>
			)}
		</div>
	)
}

export default EditableContent
