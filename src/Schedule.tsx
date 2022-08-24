import { SessionName } from 'app/SessionName'
import tableStyles from 'app/Table.module.css'
import {
	formatEventTime,
	formatUserTime,
	toEventTime,
	toUserTime,
} from 'app/time'
import { differenceInCalendarDays, formatDistance } from 'date-fns'
import { useEffect, useState } from 'react'

const diff = (startTime: Date, conferenceDate: Date) => {
	const now = new Date()
	if (startTime.getTime() - Date.now() > 24 * 60 * 60 * 1000) {
		// If difference is > 1 day
		// show distance in days to conference start, so all entries have the same difference
		const daysDistance = differenceInCalendarDays(conferenceDate, now)
		return daysDistance > 1 ? `${daysDistance} days` : '1 day'
	}
	return formatDistance(startTime, now).replace('about ', '')
}

const startsInMinutes = (startTime: Date) => {
	return Math.floor((startTime.getTime() - Date.now()) / 1000 / 60)
}

const Countdown = ({
	startTime,
	warnTime,
	conferenceDate,
	track,
}: {
	startTime: Date
	conferenceDate: Date
	warnTime?: number
	track?: string
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
			{track !== undefined ? (
				<small>
					<br />
					{track}
				</small>
			) : (
				''
			)}
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
	const [currentTime, setCurrentTime] = useState<Date>(new Date())

	useEffect(() => {
		const i = setInterval(() => {
			setCurrentTime(new Date())
		}, 60 * 1000)
		return () => {
			clearInterval(i)
		}
	}, [])

	return (
		<table className={tableStyles.Table}>
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
						<small>
							{formatTimezone(userTimeZone)} ({userFormat(currentTime)})
						</small>
					</th>
					<th>
						Starts in
						<br />
						<small>Track/Room</small>
					</th>
					<th>Session</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(sessions)
					.sort(
						([timeWithTrackA], [timeWithTrackB]) =>
							parseInt(timeWithTrackA.split('@')[0]) -
							parseInt(timeWithTrackB.split('@')[0]),
					)
					.map((session, i, sessions) => {
						const timeWithTrack = session[0]
						const time = parseInt(timeWithTrack.split('@')[0])

						const nextIsOngoing =
							sessions[i + 1] !== undefined
								? startsInMinutes(
										userTime(sessions[i + 1][0] as unknown as number),
								  ) < 0
								: false

						const isOngoing =
							startsInMinutes(userTime(time)) < 0 && !nextIsOngoing
						const isPast = startsInMinutes(userTime(time)) < 0 && !isOngoing
						return { session, isPast, isOngoing }
					})
					.filter(({ isPast }) => (hidePastSessions ? !isPast : true))
					.map(({ session: [timeWithTrack, name], isOngoing }) => {
						const [time, track] = timeWithTrack.split('@')
						return (
							<tr key={timeWithTrack} className={isOngoing ? 'ongoing' : ''}>
								<td className={'time'}>
									{formatEventTime(eventTime(time as unknown as number))}
								</td>
								<td className={'time'}>
									{userFormat(userTime(time as unknown as number))}
								</td>
								{isOngoing && (
									<td>
										<em>ongoing</em>
										{track !== undefined ? (
											<small>
												<br />
												{track}
											</small>
										) : (
											''
										)}
									</td>
								)}
								{!isOngoing && (
									<Countdown
										key={conferenceDate}
										conferenceDate={userTime(0)}
										startTime={userTime(time as unknown as number)}
										track={track}
									/>
								)}
								<td>
									<SessionName name={name} />
								</td>
							</tr>
						)
					})}
			</tbody>
		</table>
	)
}
