import React from 'react'
import { IParkingSpot, ParkingSpotTypeMapEnum } from '../../models/garage'
interface IProps {
	isOpen: boolean
	parkingSpot: IParkingSpot | null
	onSubmit: () => void
	onCancel: () => void
}

/**
 * The components will pop up when interacting with a parking spot,
 * and enables viewing and editing it.
 * @param isOpen Specifies if the drawer is open or not
 * @param parkingSpot an object of IParkingSpot
 * @param onSubmit Event handler for submitting changes
 * @param onCancel Event handler for closing the drawer
 */
const Drawer: React.FC<IProps> = ({
	isOpen,
	parkingSpot,
	onSubmit,
	onCancel,
}) => {
	return (
		<div
			className={` fixed left-0 flex h-[40vh] w-full justify-center rounded-t-2xl  bg-slate-200 shadow-2xl ${
				isOpen ? ' bottom-[0]' : 'hidden'
			}`}
		>
			<div className=" m-5 flex h-fit w-full content-center items-center justify-between md:max-w-[60vw]">
				<h3 className=" text-lg font-semibold">
					{parkingSpot?.type &&
						ParkingSpotTypeMapEnum[parkingSpot.type]}{' '}
					spot in floor {parkingSpot?.floor}
				</h3>
				<button
					title="Close"
					className="text-1xl rounded-full bg-slate-900 px-4 py-2 text-white"
					onClick={onCancel}
				>
					x
				</button>
			</div>

			<div className="flex"></div>
		</div>
	)
}

export default Drawer
