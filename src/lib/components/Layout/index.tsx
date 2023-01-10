import React, { ReactNode } from 'react'
interface IProps {
	children: ReactNode
}
const Layout: React.FC<IProps> = ({ children }) => {
	return (
		<main className="mx-auto max-w-[90vw] flex-row md:max-w-[80vw]">
			{children}
		</main>
	)
}

export default Layout
