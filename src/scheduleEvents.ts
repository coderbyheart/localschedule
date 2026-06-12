import { formatSessionName } from './formatSessionName.ts'
import { toUTCTime } from './toUTCTime.ts'

export type ScheduleEvent = {
	/** the session key, e.g. `900` or `1545@Main hall` */
	key: string
	/** the title used for calendar entries, e.g. `ExampleConf: Lunch Break` */
	title: string
	sessionName: string
	/** start time in UTC */
	start: Date
	/** end time in UTC */
	end: Date
	/** optional link associated with the session */
	url?: string
	description: string
	/** the track/room the session takes place in, if any */
	location?: string
}

/**
 * Turns a schedule into a sorted list of calendar events.
 *
 * The end time of a session is derived from the start time of the next
 * session (in the same track, or in any track for sessions without a track,
 * e.g. a lunch break). The last session defaults to a duration of one hour.
 */
export const scheduleEvents = (schedule: Schedule): ScheduleEvent[] => {
	const utcTime = toUTCTime({
		conferenceDate: schedule.day,
		eventTimezoneName: schedule.tz,
	})
	const sessions = Object.entries(schedule.sessions).sort(
		([timeWithTrackA], [timeWithTrackB]) =>
			parseInt(timeWithTrackA.split('@')[0]) -
			parseInt(timeWithTrackB.split('@')[0]),
	)
	return sessions.map(([timeWithTrack, name], i) => {
		const { sessionName, url } = formatSessionName(name)
		const urlText = url === undefined ? undefined : url.toString()

		const [time, track] = timeWithTrack.split('@')
		const startTime = utcTime(parseInt(time, 10))

		// Find next entry for end time
		let next: [string, string] | undefined = undefined
		let nextStartTime: Date | undefined = undefined

		if (track === undefined) {
			// This session has no track. Find next entry in all tracks. This entry is probably a Lunch break that is valid for all tracks.
			let j = i
			while (
				j < sessions.length - 1 &&
				(nextStartTime?.getTime() ?? 0) <= startTime.getTime()
			) {
				next = sessions[++j]
				const [nextStartTimeString] = next[0].split('@')
				nextStartTime = utcTime(parseInt(nextStartTimeString, 10))
			}
		} else {
			let nextTrack: string | undefined = undefined
			// This session a track. Find next entry in the same track OR a without a track (e.g. a lunch break)
			let j = i
			while (
				j < sessions.length - 1 &&
				(nextStartTime?.getTime() ?? 0) <= startTime.getTime() &&
				(nextTrack !== track || nextTrack === undefined)
			) {
				next = sessions[++j]
				const [nextStartTimeString, nextTrackString] = next[0].split('@')
				nextTrack = nextTrackString
				nextStartTime = utcTime(parseInt(nextStartTimeString, 10))
			}
		}

		const description = [schedule.name, `Session: ${sessionName}`, urlText].join(
			'\n',
		)

		const endTime =
			next !== undefined
				? utcTime(parseInt(next[0].split('@')[0], 10))
				: new Date(startTime.getTime() + 60 * 60 * 1000)

		return {
			key: timeWithTrack,
			title: `${schedule.name}: ${sessionName}`,
			sessionName,
			start: startTime,
			end: endTime,
			url: urlText,
			description,
			location: track,
		}
	})
}
