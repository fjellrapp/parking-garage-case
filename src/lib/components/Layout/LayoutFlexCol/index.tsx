import React, { ReactNode } from 'react'
/**
 * @param classNames - string
 * @param children   - ReactNode
 * @returns {JSX.Element}
 */
interface IProps {
	children: ReactNode
	classNames?: string
}
const LayoutFlexCol: React.FC<IProps> = ({ children, classNames }) => {
	return <div className={`flex flex-col ${classNames}`}>{children}</div>
}

export default LayoutFlexCol
