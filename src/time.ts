import { zonedTimeToUtc, format } from 'date-fns-tz'

export const toUserTime = ({
	conferenceDate,
	eventTimezoneName,
}: {
	conferenceDate: string
	eventTimezoneName: string
}) => (time: number) => {
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
export const formatUserTime = ({ userTimeZone }: { userTimeZone: string }) => (
	date: Date,
) => format(date, 'HH:mm', { timeZone: userTimeZone })

export const toEventTime = ({
	conferenceDate,
	userTimeZone,
}: {
	conferenceDate: string
	userTimeZone: string
}) => (time: number) => {
	const minutes = time % 100
	const hours = (time - minutes) / 100
	return zonedTimeToUtc(
		`${conferenceDate} ${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(
			2,
			'0',
		)}:00.000`,
		userTimeZone,
	)
}
export const formatEventTime = (date: Date) => format(date, 'HH:mm')
