import * as React from 'react'
import { useState, useRef } from 'react'
import { Table } from './style/Table'
import { Input, NumberInput, DeleteButton, AddButton } from './style/Form'

import AddIcon from 'feather-icons/dist/icons/plus-circle.svg'
import DeleteIcon from 'feather-icons/dist/icons/x-circle.svg'
import { formatEventTime, toEventTime } from './time'

type AddSession = {
	name: string
	hour: number
	minute: number
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
		hour: 0,
		minute: 0,
	})
	const inputRef = useRef<HTMLInputElement>(null)
	const isInputValid = () =>
		add.name.length > 0 &&
		add.hour >= 0 &&
		add.hour <= 23 &&
		add.minute >= 0 &&
		add.minute <= 59

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
								type="number"
								min={0}
								max={23}
								value={add.hour}
								onChange={({ target: { value } }) => {
									try {
										const hour = parseInt(value, 10)
										updateAdd({
											...add,
											hour,
										})
									} catch {
										// pass
									}
								}}
							/>
							{':'}
							<NumberInput
								type="number"
								min={0}
								max={59}
								value={add.minute}
								onChange={({ target: { value } }) => {
									try {
										const minute = parseInt(value, 10)
										updateAdd({
											...add,
											minute,
										})
									} catch {
										// pass
									}
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
								<DeleteButton>
									<DeleteIcon
										onClick={() => {
											onDelete((time as unknown) as number)
										}}
									/>
								</DeleteButton>
							</td>
							<td className={'time'}>
								{formatEventTime(eventTime((time as unknown) as number))}
							</td>
							<td>{name}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}
