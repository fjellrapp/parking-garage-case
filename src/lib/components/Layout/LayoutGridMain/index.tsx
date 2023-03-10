import React, { ReactNode } from 'react'

interface IProps {
	children: ReactNode
}
/**
 *  @param children - ReactNode
 *  @returns {JSX.Element}
 * */
const LayoutGridMain: React.FC<IProps> = ({ children }) => {
	return (
		<div className="grid min-w-[40vw] grid-rows-1 place-content-center place-items-center gap-10 rounded-lg bg-slate-50 p-10">
			{children}
		</div>
	)
}

export default LayoutGridMain
