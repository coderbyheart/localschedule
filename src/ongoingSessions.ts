import { toUTCTime } from 'app/toUTCTime'

export type ConfDate = Pick<Schedule, 'day' | 'tz'>
export type ConfDateWithSessions = Pick<Schedule, 'sessions'> & ConfDate

const timeWithTrackToUTC = (timeWithTrack: string, schedule: ConfDate): Date =>
	toUTCTime({
		conferenceDate: schedule.day,
		eventTimezoneName: schedule.tz,
	})(parseInt(timeWithTrack.split('@')[0], 10))

const isBeforeNow = (
	[timeWithTrack]: [string, string],
	now: Date,
	schedule: ConfDate,
): boolean => {
	const time = timeWithTrackToUTC(timeWithTrack, schedule)
	return time.getTime() < now.getTime()
}

export const ongoingSessions = (
	schedule: ConfDateWithSessions,
	now = new Date(),
): Sessions => {
	return (
		Object.entries(schedule.sessions)
			.sort(
				([timeWithTrackA], [timeWithTrackB]) =>
					parseInt(timeWithTrackA.split('@')[0]) -
					parseInt(timeWithTrackB.split('@')[0]),
			)
			// Filter out future sessions
			.filter(
				([timeWithTrack]) =>
					timeWithTrackToUTC(timeWithTrack, schedule).getTime() <=
					now.getTime(),
			)
			// Check of next is ongoing
			.filter(([timeWithTrack], i, sessions) => {
				const time = timeWithTrackToUTC(timeWithTrack, schedule)
				// Find the next session that does not start at the same time
				const next = sessions.find(
					([nextTimeWithTrack], j) =>
						j > i &&
						timeWithTrackToUTC(nextTimeWithTrack, schedule).getTime() >
							time.getTime(),
				)
				if (next === undefined) return true // No next session found, so this one must be the last session and therefore it is ongoing
				return !isBeforeNow(next, now, schedule)
			})
			.reduce((ongoing, [k, v]) => ({ ...ongoing, [k]: v }), {})
	)
}
