import { format } from 'date-fns'
import { useState } from 'react'

export const DaySelector = ({
	day,
	onUpdate,
	className,
}: {
	day: string
	className?: string
	onUpdate: (date: string) => unknown
}) => {
	const [value, setValue] = useState<string>(day)
	return (
		<input
			className={className}
			type="date"
			value={value}
			aria-label="date-input"
			onChange={({ target: { value } }) => {
				setValue(value)
				try {
					onUpdate(format(new Date(value), 'yyyy-MM-dd'))
				} catch {
					// Ignore invalid dates here
				}
			}}
		/>
	)
}
