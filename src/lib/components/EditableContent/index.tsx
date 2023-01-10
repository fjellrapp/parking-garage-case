import React from 'react'
import {
	IParkingSpot,
	ParkingSpotTypeEnum,
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

/**
 * The editable content component is used to display editable content in the drawer.
 */
interface IProps {
	spot: IParkingSpot
}
/**
 *
 * @param spot an object of Ispot
 */
const EditableContent: React.FC<IProps> = ({ spot }) => {
	/**
	 * The fee and type are stored in the state, and updated when the user changes the value.
	 */
	const [fee, editFee] = React.useState<number | null>(spot.fee)
	const [type, editType] = React.useState<number | null>(spot.type)
	/**
	 * The isNewSpot variable is used to determine if the spot is new or not.
	 */
	const isNewSpot = spot?.type === null

	const dispatch = useAppDispatch()

	/**
	 *  The handleEditFee function is used to update the fee in the state
	 * @param e The event object
	 */
	const handleEditFee = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fee = Number(e.target.value)
		editFee(fee)
	}

	/**
	 * The handleSaveFee function is used to save the fee in the store
	 */
	const handleCreateNewSpot = () => {
		const newSpot: IParkingSpot = {
			...spot,
			type: type as ParkingSpotTypeEnum,
			fee: fee as number,
		}
		dispatch(saveNewSpot(newSpot))
	}

	/**
	 *  The handleEditType function is used to update the type in the state
	 * @param e The event object
	 */
	const handleEditType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const type = Number(e.target.value)
		editType(type)
	}
	return (
		/**
		 * The content is displayed in a flex column, with a gap of 5. The overflow is set to auto, so that the content is scrollable.
		 */
		<div className="mx-5 flex flex-col gap-5 overflow-y-auto pr-0 scrollbar scrollbar-thin scrollbar-track-slate-200  scrollbar-thumb-slate-300">
			{/**
			 * The ContentGroup component is used to display the content, and is also used to edit content.
			 * The label is the title of the content, and the id is used to identify the content.
			 */}
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
			{/**
			 * The editableContent prop is used to set the value of the input field.
			 * The saveButton prop is used to determine if the save button should be displayed or not.
			 * The type prop is used to determine the type of input field.
			 * The onChange prop is used to update the value in the state.
			 * The onSave prop is used to save the value in the store.
			 * The onCancel prop is used to reset the value in the state.
			 */}
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
				label={`Parking spot type ${isNewSpot ? '(required)' : ''}`}
				id="type"
				editableContent={type}
				saveButton={isNewSpot ? false : true}
				type="select"
				onChange={(e) =>
					handleEditType(e as React.ChangeEvent<HTMLSelectElement>)
				}
				onSave={() =>
					dispatch(updateSpotType(type as ParkingSpotTypeEnum))
				}
				onCancel={() => editType(null)}
			>
				{spot?.type
					? ParkingSpotTypeMapEnum[spot.type]
					: 'Not selected'}
			</ContentGroup>
			{/**
			 * The button is only displayed if the spot is new.
			 * The button is disabled if the type is not selected.
			 * The button is used to save the new spot in the store.
			 * The onClick prop is used to save the new spot in the store.
			 * The disabled prop is used to disable the button if the type is not selected.
			 * The title prop is used to display a tooltip if the type is not selected.
			 **/}
			{isNewSpot && (
				<div className="m-5 flex justify-end">
					<button
						title={type === null ? 'Select a type' : 'Submit'}
						role="button"
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
