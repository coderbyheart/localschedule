import * as React from 'react'
import { Table } from './style/Table'
import {
	formatEventTime,
	toEventTime,
	formatUserTime,
	toUserTime,
} from './time'
import { formatDistance } from 'date-fns'

const diff = (startTime: Date) => formatDistance(startTime, new Date())

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
	const [timeToStart, setTimeToStart] = React.useState({
		text: diff(startTime),
		minutes: startsInMinutes(startTime),
	})
	React.useEffect(() => {
		const interval = setInterval(() => {
			setTimeToStart({
				text: diff(startTime),
				minutes: startsInMinutes(startTime),
			})
		}, 1000 * 60)

		return () => clearInterval(interval)
	}, [startTime])
	return (
		<td
			className={
				timeToStart.minutes >= 0 && timeToStart.minutes <= (warnTime || 5)
					? 'time hot'
					: 'time'
			}
		>
			{timeToStart.minutes >= 0 && timeToStart.text}
			{timeToStart.minutes < 0 && '-'}
		</td>
	)
}

const formatTimezone = (tz: string) => tz.split('/')[1].replace('_', ' ')

export const Schedule = ({
	conferenceDate,
	eventTimezoneName,
	sessions,
}: {
	conferenceDate: string
	eventTimezoneName: string
	sessions: { [key: number]: string }
}) => {
	const userTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone
	const eventTime = toEventTime({ conferenceDate, userTimeZone })
	const userTime = toUserTime({ conferenceDate, eventTimezoneName })
	const userFormat = formatUserTime({ userTimeZone })

	return (
		<Table>
			<thead>
				<tr>
					<th>
						Conf Time
						<br />
						<small>{formatTimezone(eventTimezoneName)}</small>
					</th>
					<th>
						Your Time
						<br />
						<small>{formatTimezone(userTimeZone)}</small>
					</th>
					<th>Starts in</th>
					<th>Session</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(sessions).map(([time, name]) => (
					<tr key={time}>
						<td className={'time'}>
							{formatEventTime(eventTime((time as unknown) as number))}
						</td>
						<td className={'time'}>
							{userFormat(userTime((time as unknown) as number))}
						</td>
						<Countdown
							key={conferenceDate}
							startTime={userTime((time as unknown) as number)}
						/>
						<td>{name}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}
