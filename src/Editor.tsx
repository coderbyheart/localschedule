import { formatEventTime, toEventTime } from 'app/time'
import { useRef, useState } from 'react'
import { AddIcon, DeleteIcon } from 'style/FeatherIcons'
import { AddButton, DeleteButton, Input, NumberInput } from 'style/Form'
import { Table } from 'style/Table'

type AddSession = {
	name: string
	hour: string
	minute: string
}

const toNumber = (n: string) => {
	try {
		return parseInt(n, 10)
	} catch {
		return null
	}
}

export const Editor = ({
	conferenceDate,
	sessions,
	onAdd,
	onDelete,
}: {
	conferenceDate: string
	eventTimezoneName: string
	sessions: { [key: number]: string }
	onAdd: (newSession: AddSession) => void
	onDelete: (time: number) => void
}) => {
	const [add, updateAdd] = useState<AddSession>({
		name: '',
		hour: '19',
		minute: '45',
	})
	const inputRef = useRef<HTMLInputElement>(null)
	const isInputValid = () => {
		const hour = toNumber(add.hour)
		const minute = toNumber(add.minute)
		return (
			add.name.length > 0 &&
			hour !== null &&
			hour >= 0 &&
			hour <= 23 &&
			minute !== null &&
			minute >= 0 &&
			minute <= 59
		)
	}

	const userTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone
	const eventTime = toEventTime({ conferenceDate, userTimeZone })

	const addAction = (add: AddSession) => {
		onAdd(add)
		updateAdd({
			...add,
			name: '',
		})
		inputRef.current?.focus()
	}

	return (
		<>
			<Table>
				<thead>
					<tr>
						<th></th>
						<th>Conf Time</th>
						<th>Session</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<AddButton
								disabled={!isInputValid()}
								onClick={() => {
									addAction(add)
								}}
							>
								<AddIcon />
							</AddButton>
						</td>
						<td className="time">
							<NumberInput
								ref={inputRef}
								type="text"
								inputMode="numeric"
								value={add.hour}
								onChange={({ target: { value } }) => {
									updateAdd({
										...add,
										hour: value,
									})
								}}
							/>
							{':'}
							<NumberInput
								type="text"
								inputMode="numeric"
								value={add.minute}
								onChange={({ target: { value } }) => {
									updateAdd({
										...add,
										minute: value,
									})
								}}
							/>
						</td>
						<td>
							<Input
								type="text"
								value={add.name}
								onKeyUp={({ key }) => {
									if (key === 'Enter') {
										if (isInputValid()) {
											addAction(add)
											onAdd(add)
										}
									}
								}}
								onChange={({ target: { value } }) =>
									updateAdd({
										...add,
										name: value,
									})
								}
							/>
						</td>
					</tr>
					{Object.entries(sessions).map(([time, name]) => (
						<tr key={time}>
							<td>
								<DeleteButton
									onClick={() => {
										onDelete(time as unknown as number)
									}}
								>
									<DeleteIcon />
								</DeleteButton>
							</td>
							<td className={'time'}>
								{formatEventTime(eventTime(time as unknown as number))}
							</td>
							<td>{name}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}
