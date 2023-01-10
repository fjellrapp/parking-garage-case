import React, { Fragment, HTMLInputTypeAttribute, ReactNode } from 'react'

/**
 * @param {string} label - Label for the content group
 * @param {string} id - Id for the content group
 * @param {HTMLInputTypeAttribute} type - Type of input
 * @param {string | number | undefined | null} editableContent - Content to be edited
 * @param {ReactNode} children - Content to be displayed
 * @param {boolean} saveButton - Determines if the save button should be displayed
 * @param {function} onChange - Function to be called when the value of the input changes
 * @param {function} onSave - Function to be called when the save button is clicked
 * @param {function} onCancel - Function to be called when the cancel button is clicked
 *
 */
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
	/**
	 * Determines if the content is editable or not
	 */
	const [edit, setEdit] = React.useState(false)
	/**
	 * Determines if the content is editable or not
	 */
	const hasEditableContent = editableContent !== undefined
	/**
	 * Handles the save button click
	 */
	const handleSave = () => {
		onSave && onSave()
		setEdit(false)
	}
	/**
	 * Handles the cancel button click
	 */
	const handleCancel = () => {
		onCancel && onCancel()
		setEdit(false)
	}
	/**
	 * Renders the inputs
	 * @returns {JSX.Element}
	 */
	const Inputs = () => {
		return (
			<Fragment>
				{type === 'select' && (
					<select
						id={id}
						name={id}
						className="w-[40%] rounded-md border border-gray-300 p-2"
						onChange={(e) => onChange && onChange(e)}
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
	/**
	 * Renders the edit actions
	 * @returns {JSX.Element}
	 */
	const EditActions = () => {
		return (
			<Fragment>
				{!edit && (
					<button
						title="Edit"
						className="text-blue-700 underline hover:text-blue-800"
						aria-label="Edit"
						onClick={() => setEdit(true)}
					>
						Edit
					</button>
				)}
				{/**
				 * If the content is editable, render the inputs
				 */}
				{edit && (
					<div className="flex gap-3">
						<button
							title="Edit"
							className="text-blue-700 underline hover:text-blue-900"
							aria-label="Edit"
							onClick={handleCancel}
						>
							Cancel
						</button>
						{/**
						 * If the content is editable, render the inputs
						 */}
						{saveButton && (
							<button
								title="Edit"
								className="text-blue-700 underline hover:text-blue-900"
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
				{/**
				 * If the content is editable, render the edit actions
				 */}
				{hasEditableContent && <EditActions />}
			</div>
			{/**
			 *  If the content is editable, render the inputs
			 */}
			{!!edit && <Inputs />}
			{/**
			 * If the content is not editable, render the children
			 */}
			{!edit && children}
		</div>
	)
}
export default ContentGroup
