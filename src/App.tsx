import React from 'react'
import Layout from './lib/components/Layout'
import { useAppSelector } from './lib/hooks'
import GarageFloor from './lib/components/GarageFloor'
import Heading from './lib/components/Heading'

function App() {
	const garage = useAppSelector((state) => state).garageSlice.garage

	return (
		<Layout>
			<div className="flex flex-col gap-6">
				<Heading />
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
		</Layout>
	)
}

export default App
