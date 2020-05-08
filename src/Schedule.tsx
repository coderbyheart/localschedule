import * as React from 'react'
import { useState } from 'react'
import { Table } from './style/Table'
import {
	Button,
	Input,
	DateInput,
	NumberInput,
	DeleteButton,
	AddButton,
} from './style/Form'
import { zonedTimeToUtc, format } from 'date-fns-tz'
import { TimeZoneSelector } from './timezones'

import LockIcon from 'feather-icons/dist/icons/lock.svg'
import UnlockIcon from 'feather-icons/dist/icons/unlock.svg'
import AddIcon from 'feather-icons/dist/icons/plus-circle.svg'
import DeleteIcon from 'feather-icons/dist/icons/x-circle.svg'

const startsInMinutes = (startTime: Date) => {
	return Math.floor((startTime.getTime() - Date.now()) / 1000 / 60)
}

const Countdown = ({
	startTime,
	warnTime,
}: {
	startTime: Date
	warnTime?: number
}) => {
	const [timeToStart, setTimeToStart] = React.useState(
		startsInMinutes(startTime),
	)
	React.useEffect(() => {
		const interval = setInterval(() => {
			setTimeToStart(startsInMinutes(startTime))
		}, 1000 * 60)

		return () => clearInterval(interval)
	}, [startTime])
	return (
		<td
			className={
				timeToStart > 0 && timeToStart <= (warnTime || 5) ? 'time hot' : 'time'
			}
		>
			{timeToStart > 0 ? `${timeToStart}m` : '-'}
		</td>
	)
}

const userTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone

export const Schedule = ({
	conferenceName,
	conferenceDate,
	eventTimezoneName,
	sessions,
}: {
	conferenceName: string
	conferenceDate: string
	eventTimezoneName: string
	sessions: { [key: number]: string }
}) => {
	const [editing, setEditing] = useState(false)
	const [updatedName, updateName] = useState(conferenceName)
	const [updatedDay, updateDay] = useState(conferenceDate)
	const [updatedTimeZone, updateTimeZone] = useState(eventTimezoneName)
	const [updatedSessions, updateSessions] = useState(sessions)
	const [add, updateAdd] = useState({ name: '', hour: 0, minute: 0 })

	const toUserTime = (time: number) => {
		const minutes = time % 100
		const hours = (time - minutes) / 100
		return zonedTimeToUtc(
			`${updatedDay} ${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(
				2,
				'0',
			)}:00.000`,

			updatedTimeZone,
		)
	}
	const formatUserTime = (date: Date) =>
		format(date, 'HH:mm', { timeZone: userTimeZone })

	const toEventTime = (time: number) => {
		const minutes = time % 100
		const hours = (time - minutes) / 100
		return zonedTimeToUtc(
			`${updatedDay} ${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(
				2,
				'0',
			)}:00.000`,
			userTimeZone,
		)
	}
	const formatEventTime = (date: Date) => format(date, 'HH:mm')
	return (
		<Table>
			<thead>
				<tr>
					<th colSpan={4}>
						{!editing && `${updatedName}: ${updatedDay}`}
						{editing && (
							<>
								<Input
									type="text"
									value={updatedName}
									onChange={({ target: { value } }) => updateName(value)}
								/>
								<DateInput
									type="date"
									value={updatedDay}
									onChange={({ target: { value } }) => updateDay(value)}
								/>
							</>
						)}
						<Button
							title="Edit schedule"
							onClick={() => {
								if (editing) {
									const cfg = {
										name: updatedName,
										day: updatedDay,
										tz: updatedTimeZone,
										sessions: updatedSessions,
									}
									window.location.assign(
										`${document.location.href.replace(
											/#.+/,
											'',
										)}#${encodeURIComponent(btoa(JSON.stringify(cfg)))}`,
									)
								}
								setEditing((editing) => !editing)
							}}
						>
							{editing ? <UnlockIcon /> : <LockIcon />}
						</Button>
					</th>
				</tr>
				<tr>
					<th>
						Conf Time
						<br />
						{editing && (
							<TimeZoneSelector
								value={updatedTimeZone}
								onChange={({ target: { value } }) => updateTimeZone(value)}
							/>
						)}
						{!editing && <small>{updatedTimeZone}</small>}
					</th>
					<th>
						Your Time
						<br />
						<small>{userTimeZone}</small>
					</th>
					<th>Starts in</th>
					<th>Session</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(updatedSessions).map(([time, name]) => (
					<tr key={time}>
						<td className={'time'}>
							{formatEventTime(toEventTime((time as unknown) as number))}
						</td>
						<td className={'time'}>
							{formatUserTime(toUserTime((time as unknown) as number))}
						</td>
						<Countdown
							key={updatedDay}
							startTime={toUserTime((time as unknown) as number)}
						/>
						<td>
							{name}
							{editing && (
								<DeleteButton>
									<DeleteIcon
										onClick={() => {
											updateSessions((sessions) => {
												const s = { ...sessions }
												delete s[(time as unknown) as number]
												return s
											})
										}}
									/>
								</DeleteButton>
							)}
						</td>
					</tr>
				))}
				{editing && (
					<tr>
						<td className="time">
							<NumberInput
								type="number"
								min={0}
								max={23}
								value={add.hour}
								onChange={({ target: { value } }) =>
									updateAdd({
										...add,
										hour: parseInt(value, 10),
									})
								}
							/>
							<NumberInput
								type="number"
								min={0}
								max={59}
								value={add.minute}
								onChange={({ target: { value } }) =>
									updateAdd({
										...add,
										minute: parseInt(value, 10),
									})
								}
							/>
						</td>
						<td colSpan={2}></td>
						<td>
							<Input
								type="text"
								value={add.name}
								onChange={({ target: { value } }) =>
									updateAdd({
										...add,
										name: value,
									})
								}
							/>
							<AddButton>
								<AddIcon
									onClick={() => {
										updateSessions((sessions) => ({
											...sessions,
											[parseInt(`${add.hour}${add.minute}`, 10)]: add.name,
										}))
									}}
								/>
							</AddButton>
						</td>
					</tr>
				)}
			</tbody>
		</Table>
	)
}
