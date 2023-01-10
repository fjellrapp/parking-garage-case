import React from 'react'
import {
	IParkingSpot,
	ParkingSpotType,
	ParkingSpotTypeMapEnum,
} from '../../models/garage'
import { format, millisecondsToHours } from 'date-fns'
import ContentGroup from '../ContentGroup'
import { useAppDispatch } from '../../hooks'
import {
	saveNewSpot,
	updateFee,
	updateSpotType,
} from '../../store/slices/garageSlice'

interface IProps {
	spot: IParkingSpot
}

const EditableContent: React.FC<IProps> = ({ spot }) => {
	const [fee, editFee] = React.useState<number | null>(spot.fee)
	const [type, editType] = React.useState<number | null>(spot.type)
	const isNewSpot = spot?.type === null

	const dispatch = useAppDispatch()

	const handleEditFee = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fee = Number(e.target.value)
		editFee(fee)
	}

	const handleCreateNewSpot = () => {
		const newSpot: IParkingSpot = {
			...spot,
			type: type as ParkingSpotType,
			fee: fee as number,
		}
		dispatch(saveNewSpot(newSpot))
	}

	const handleEditType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const type = Number(e.target.value)
		editType(type)
	}
	return (
		<div className="mx-5 flex flex-col gap-5 overflow-y-auto pr-0 scrollbar scrollbar-thin scrollbar-track-slate-200  scrollbar-thumb-slate-300">
			<ContentGroup
				label="Occupied at"
				id="occupiedAtDateTime"
				type="date"
			>
				{spot.occupiedAtDateTime
					? format(spot.occupiedAtDateTime, 'dd.MM.yyyy hh:mm')
					: 'Not occupied'}
			</ContentGroup>
			<ContentGroup label="Duration" id="duration" type="number">
				{millisecondsToHours(spot.duration)} hours
			</ContentGroup>

			<ContentGroup
				label="Current rate"
				id="rate"
				editableContent={fee}
				saveButton={isNewSpot ? false : true}
				type="number"
				onChange={(e) =>
					handleEditFee(e as React.ChangeEvent<HTMLInputElement>)
				}
				onSave={() => fee && dispatch(updateFee(fee))}
				onCancel={() => editFee(null)}
			>
				NOK {spot?.fee},-
			</ContentGroup>
			<ContentGroup
				label="Parking spot type"
				id="type"
				editableContent={type}
				saveButton={isNewSpot ? false : true}
				type="select"
				onChange={(e) =>
					handleEditType(e as React.ChangeEvent<HTMLSelectElement>)
				}
				onSave={() => dispatch(updateSpotType(type as ParkingSpotType))}
				onCancel={() => editType(null)}
			>
				{spot?.type
					? ParkingSpotTypeMapEnum[spot.type]
					: 'Not selected'}
			</ContentGroup>
			{isNewSpot && (
				<div className="m-5 flex justify-end">
					<button
						title="Submit"
						className="rounded-full bg-blue-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-blue-900 disabled:hover:bg-gray-500"
						onClick={() => handleCreateNewSpot()}
						disabled={type === null}
					>
						Submit
					</button>
				</div>
			)}
		</div>
	)
}

export default EditableContent
