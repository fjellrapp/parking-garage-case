import { ReactNode } from 'react'
import React from 'react'
interface IProps {
	children: ReactNode
	isOpen: boolean
}
/**
 * @param isOpen    - boolean
 * @returns {JSX.Element}
 */
const DrawerContainers: React.FC<IProps> = ({ isOpen, children }) => {
	return (
		<div
			aria-expanded={isOpen}
			className={`fixed left-0 flex h-[40vh] w-screen justify-center rounded-t-2xl  bg-slate-200 shadow-2xl ${
				isOpen ? ' bottom-[0]' : 'hidden'
			}`}
		>
			<div className="flex w-full max-w-[1372px] flex-col">
				{children}
			</div>
		</div>
	)
}

export default DrawerContainers
