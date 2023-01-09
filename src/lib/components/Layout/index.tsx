import React, { ReactNode } from 'react'
interface IProps {
	children: ReactNode
}
const Layout: React.FC<IProps> = ({ children }) => {
	return (
		<div className="mx-auto max-w-[90vw] flex-row md:max-w-[80vw]">
			{children}
		</div>
	)
}

export default Layout
