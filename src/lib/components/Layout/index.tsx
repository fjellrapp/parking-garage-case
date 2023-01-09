import React, { ReactNode } from 'react'
interface IProps {
	children: ReactNode
}
const Layout: React.FC<IProps> = ({ children }) => {
	return <div className="flex flex-row mx-auto max-w-[80vw]">{children}</div>
}

export default Layout
