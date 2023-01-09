import React from 'react'
import Layout from './lib/components/Layout'
import { useAppDispatch, useAppSelector } from './lib/hooks'
import GarageFloor from './lib/components/GarageFloor'
import Heading from './lib/components/Heading'
import Drawer from './lib/components/Drawer'
import { removeCurrentSelection } from './lib/store/slices/garageSlice'

function App() {
	const garage = useAppSelector((state) => state).garageSlice.garage
	const selectedParkingSpot = useAppSelector(
		(state) => state.garageSlice.currentSelection
	)

	const dispatch = useAppDispatch()

	const availabilityAllFloors = garage.reduce(
		(prev, curr) => curr.available + prev,
		0
	)
	const totalSpots = garage.reduce((prev, curr) => curr.capacity + prev, 0)

	return (
		<Layout>
			<div className="flex flex-col gap-6">
				<Heading />

				<p className=" font-sans">
					Current availability on all floors:{' '}
					<span className=" font-bold">
						{availabilityAllFloors} / {totalSpots}
					</span>
				</p>
				<div className="flex gap-3">
					<span
						className={`h-fit w-fit rounded-md bg-red-400 p-2 text-white`}
					>
						Unavailable
					</span>
					<span className="h-fit w-fit rounded-md bg-blue-400 p-2 text-white">
						Available
					</span>
				</div>

				<div className="flex flex-col items-center gap-10 md:flex-row">
					{garage.map((floor, index) => (
						<div
							className={`grid min-w-[40vw] grid-rows-1 place-content-center place-items-center gap-10 bg-slate-50 p-10`}
							key={`${floor.name}-${index}`}
						>
							<GarageFloor floor={floor} />
						</div>
					))}
				</div>
			</div>
			<Drawer
				isOpen={Boolean(selectedParkingSpot)}
				spot={selectedParkingSpot}
				onCancel={() => dispatch(removeCurrentSelection())}
				onSubmit={() => console.log('submit')}
			/>
		</Layout>
	)
}

export default App
