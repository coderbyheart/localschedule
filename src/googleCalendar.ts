import { scheduleEvents, type ScheduleEvent } from './scheduleEvents.ts'

const pad = (n: number): string => `${n}`.padStart(2, '0')

/**
 * Formats a date as a UTC timestamp understood by Google Calendar,
 * e.g. `20220311T080000Z`.
 */
export const toGoogleCalendarDate = (date: Date): string =>
	`${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(
		date.getUTCDate(),
	)}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(
		date.getUTCSeconds(),
	)}Z`

/**
 * Builds a link that adds a single event directly to the user's Google
 * Calendar.
 *
 * See https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/master/services/google.md
 */
export const googleCalendarEventUrl = (event: ScheduleEvent): string => {
	const params = new URLSearchParams({
		action: 'TEMPLATE',
		text: event.title,
		dates: `${toGoogleCalendarDate(event.start)}/${toGoogleCalendarDate(
			event.end,
		)}`,
		details: event.description,
	})
	if (event.location !== undefined && event.location.length > 0)
		params.set('location', event.location)
	return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/** Formats the conference-local time of a session key, e.g. `1545` -> `15:45`. */
const formatTimeOfDay = (key: string): string => {
	const time = parseInt(key.split('@')[0], 10)
	const minutes = time % 100
	const hours = (time - minutes) / 100
	return `${pad(hours)}:${pad(minutes)}`
}

/**
 * Builds a link that adds the entire schedule to Google Calendar as one event,
 * spanning from the earliest session start to the latest session end, with all
 * sessions listed in the description. This way the whole schedule can be added
 * in a single click, just like the iCal download.
 */
export const googleCalendarScheduleUrl = (
	schedule: Schedule,
): string | undefined => {
	const events = scheduleEvents(schedule)
	if (events.length === 0) return undefined

	const start = events.reduce(
		(earliest, { start }) => (start < earliest ? start : earliest),
		events[0].start,
	)
	const end = events.reduce(
		(latest, { end }) => (end > latest ? end : latest),
		events[0].end,
	)

	const description = [
		schedule.name,
		'',
		...events.map(({ key, sessionName, location, url }) =>
			[
				`${formatTimeOfDay(key)} ${sessionName}`,
				location !== undefined ? `(${location})` : undefined,
				url,
			]
				.filter((part): part is string => part !== undefined && part.length > 0)
				.join(' '),
		),
	].join('\n')

	return googleCalendarEventUrl({
		key: 'schedule',
		title: schedule.name,
		sessionName: schedule.name,
		start,
		end,
		description,
	})
}
