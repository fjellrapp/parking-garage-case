import React, { ReactNode } from 'react'
/**
 * @param children - ReactNode
 * @return {JSX.Element}
 */
interface IProps {
	children: ReactNode
}
const LayoutMain: React.FC<IProps> = ({ children }) => {
	return (
		<main className="mx-auto max-w-[90vw] flex-row md:max-w-[80vw]">
			{children}
		</main>
	)
}

export default LayoutMain
