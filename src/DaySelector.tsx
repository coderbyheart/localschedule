import styles from 'app/DaySelector.module.css'
import { format } from 'date-fns'
import { useState } from 'react'
export const DaySelector = ({
	day,
	onUpdate,
}: {
	day: string
	onUpdate: (date: string) => unknown
}) => {
	const [value, setValue] = useState<string>(day)
	return (
		<input
			className={styles.DaySelector}
			type="date"
			value={value}
			aria-label="date-input"
			name="conference-day"
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
