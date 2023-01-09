import React from 'react'
import Layout from './lib/components/Layout'
import { useAppSelector } from './lib/hooks'
import GarageFloor from './lib/components/GarageFloor'

function App() {
	const garage = useAppSelector((state) => state).garageSlice.garage

	return (
		<Layout>
			<div className="flex flex-col gap-6">
				<h1 className="py-10 text-3xl font-bold">Parking garage</h1>
				<div className="flex flex-col gap-10 md:flex-row">
					{garage.map((floor, index) => (
						<div
							className="grid w-[40vw] grid-rows-1 md:grid-rows-2"
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
