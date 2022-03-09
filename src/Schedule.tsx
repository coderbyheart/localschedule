import {
	formatEventTime,
	formatUserTime,
	toEventTime,
	toUserTime,
} from 'app/time'
import { differenceInCalendarDays, formatDistance } from 'date-fns'
import { useEffect, useState } from 'react'
import { Table } from 'style/Table'

const diff = (startTime: Date, conferenceDate: Date) => {
	const now = new Date()
	if (startTime.getTime() - Date.now() > 24 * 60 * 60 * 1000) {
		// If difference is > 1 day
		// show distance in days to conference start, so all entries have the same difference
		const daysDistance = differenceInCalendarDays(conferenceDate, now)
		return daysDistance > 1 ? `about ${daysDistance} days` : 'about 1 day'
	}
	return formatDistance(startTime, now)
}

const startsInMinutes = (startTime: Date) => {
	return Math.floor((startTime.getTime() - Date.now()) / 1000 / 60)
}

const Countdown = ({
	startTime,
	warnTime,
	conferenceDate,
}: {
	startTime: Date
	conferenceDate: Date
	warnTime?: number
}) => {
	const [timeToStart, setTimeToStart] = useState({
		text: diff(startTime, conferenceDate),
		minutes: startsInMinutes(startTime),
	})
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeToStart({
				text: diff(startTime, conferenceDate),
				minutes: startsInMinutes(startTime),
			})
		}, 1000 * 60)

		return () => clearInterval(interval)
	}, [startTime, conferenceDate])
	return (
		<td
			className={
				timeToStart.minutes >= 0 && timeToStart.minutes <= (warnTime ?? 5)
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
	hidePastSessions,
}: {
	conferenceDate: string
	eventTimezoneName: string
	sessions: { [key: number]: string }
	hidePastSessions: boolean
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
				{Object.entries(sessions)
					.filter(
						([time]) =>
							!hidePastSessions ||
							startsInMinutes(userTime(time as unknown as number)) > 0,
					)
					.map(([time, name]) => (
						<tr key={time}>
							<td className={'time'}>
								{formatEventTime(eventTime(time as unknown as number))}
							</td>
							<td className={'time'}>
								{userFormat(userTime(time as unknown as number))}
							</td>
							<Countdown
								key={conferenceDate}
								conferenceDate={userTime(0)}
								startTime={userTime(time as unknown as number)}
							/>
							<td>{name}</td>
						</tr>
					))}
			</tbody>
		</Table>
	)
}
