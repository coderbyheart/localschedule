import { zonedTimeToUtc } from 'date-fns-tz'

export const toUTCTime =
	({
		conferenceDate,
		eventTimezoneName,
	}: {
		conferenceDate: string
		eventTimezoneName: string
	}) =>
	(time: number): Date => {
		const minutes = time % 100
		const hours = (time - minutes) / 100
		return zonedTimeToUtc(
			`${conferenceDate} ${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(
				2,
				'0',
			)}:00.000`,
			eventTimezoneName,
		)
	}
