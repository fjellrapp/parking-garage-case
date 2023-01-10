import React, { Fragment, HTMLInputTypeAttribute, ReactNode } from 'react'
interface IProps {
	label: string
	id: 'rate' | 'duration' | 'type' | 'occupiedAtDateTime'
	type: HTMLInputTypeAttribute
	editableContent?: string | number | undefined | null
	children: ReactNode
	saveButton?: boolean
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	onSave?: () => void
	onCancel?: () => void
}
const ContentGroup: React.FC<IProps> = ({
	label,
	id,
	type,
	editableContent,
	saveButton = true,
	onChange,
	onSave,
	onCancel,
	children,
}) => {
	const [edit, setEdit] = React.useState(false)

	const hasEditableContent = editableContent !== undefined

	const handleSave = () => {
		onSave && onSave()
		setEdit(false)
	}

	const handleCancel = () => {
		onCancel && onCancel()
		setEdit(false)
	}

	const Inputs = () => {
		return (
			<Fragment>
				{type === 'select' && (
					<select
						id={id}
						name={id}
						className="w-[40%] rounded-md border border-gray-300 p-2"
						onChange={(e) => onChange(e)}
						value={
							editableContent ? (editableContent as number) : ''
						}
					>
						<option value="" disabled defaultChecked>
							Select
						</option>
						<option value="1">Compact</option>
						<option value="2">Large</option>
						<option value="3">HC</option>
						<option value="4">Motorcycle</option>
					</select>
				)}
				{type !== 'select' && (
					<input
						id={id}
						name={id}
						type={type}
						className="w-[40%] rounded-md border border-gray-300 p-2"
						onChange={onChange}
						value={editableContent as number}
					/>
				)}
			</Fragment>
		)
	}

	const EditActions = () => {
		return (
			<Fragment>
				{!edit && (
					<button
						title="Edit"
						className="text-blue-600 underline hover:text-blue-800"
						aria-label="Edit"
						onClick={() => setEdit(true)}
					>
						Edit
					</button>
				)}
				{edit && (
					<div className="flex gap-3">
						<button
							title="Edit"
							className="text-blue-600 underline hover:text-blue-800"
							aria-label="Edit"
							onClick={handleCancel}
						>
							Cancel
						</button>
						{saveButton && (
							<button
								title="Edit"
								className="text-blue-600 underline hover:text-blue-800"
								aria-label="Edit"
								onClick={handleSave}
							>
								Save
							</button>
						)}
					</div>
				)}
			</Fragment>
		)
	}
	return (
		<div className="flex flex-col">
			<div className="flex gap-3">
				<label htmlFor={id} className="font-bold">
					{label}
				</label>
				{hasEditableContent && <EditActions />}
			</div>
			{!!edit && <Inputs />}
			{!edit && children}
		</div>
	)
}
export default ContentGroup
