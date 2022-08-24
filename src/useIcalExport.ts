import type { Schedule } from 'app/App'
import { formatSessionName } from 'app/SessionName'
import { zonedTimeToUtc } from 'date-fns-tz'
import { createEvents } from 'ics'

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

export const useIcalExport = (schedule: Schedule) => {
	return (): void => {
		const utcTime = toUTCTime({
			conferenceDate: schedule.day,
			eventTimezoneName: schedule.tz,
		})
		const { error, value } = createEvents(
			Object.entries(schedule.sessions)
				.sort(
					([timeWithTrackA], [timeWithTrackB]) =>
						parseInt(timeWithTrackA.split('@')[0]) -
						parseInt(timeWithTrackB.split('@')[0]),
				)
				.map(([timeWithTrack, name], i, sessions) => {
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

					const description = [
						schedule.name,
						`Session: ${sessionName}`,
						urlText,
					].join('\n')

					if (next !== undefined) {
						const [endTimeString] = next[0].split('@')
						const endTime = utcTime(parseInt(endTimeString, 10))
						return {
							title: `${schedule.name}: ${sessionName}`,
							start: [
								startTime.getUTCFullYear(),
								startTime.getUTCMonth() + 1,
								startTime.getUTCDate(),
								startTime.getUTCHours(),
								startTime.getUTCMinutes(),
							],
							startInputType: 'utc',
							end: [
								endTime.getUTCFullYear(),
								endTime.getUTCMonth() + 1,
								endTime.getUTCDate(),
								endTime.getUTCHours(),
								endTime.getUTCMinutes(),
							],
							endInputType: 'utc',
							url: urlText,
							description,
							location: track,
						}
					} else {
						return {
							title: `${schedule.name}: ${sessionName}`,
							start: [
								startTime.getUTCFullYear(),
								startTime.getUTCMonth() + 1,
								startTime.getUTCDate(),
								startTime.getUTCHours(),
								startTime.getUTCMinutes(),
							],
							startInputType: 'utc',
							duration: { minutes: 60 },
							url: urlText,
							description,
							location: track,
						}
					}
				}),
		)

		if (value !== undefined) {
			const file = new File([value], `${schedule.name}.ics`)
			const link = document.createElement('a')
			link.style.display = 'none'
			link.href = URL.createObjectURL(file)
			link.download = file.name

			document.body.appendChild(link)
			link.click()

			setTimeout(() => {
				URL.revokeObjectURL(link.href)
				link.parentNode?.removeChild(link)
			}, 0)
		}

		if (error !== undefined && error !== null)
			console.error(`[iCalExport]`, error)
	}
}
