import React, { HTMLInputTypeAttribute, ReactNode } from 'react'
interface IProps {
	label: string
	id: string
	edit?: boolean
	type: HTMLInputTypeAttribute
	editableContent?: string | number | undefined
	children: ReactNode
	onChange: () => void
}
const ContentGroup: React.FC<IProps> = ({
	label,
	id,
	edit = false,
	type,
	editableContent,
	onChange,
	children,
}) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={id} className="font-bold">
				{label}
			</label>
			{!!(edit && editableContent !== null) && (
				<input
					id={id}
					type={type}
					value={editableContent && type === 'number' ? 0 : undefined}
					onChange={onChange}
				/>
			)}
			{!edit && children}
		</div>
	)
}
export default ContentGroup
