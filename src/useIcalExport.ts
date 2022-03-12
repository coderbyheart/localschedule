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
			Object.entries(schedule.sessions).map(([time, name], i, sessions) => {
				const { sessionName, url } = formatSessionName(name)
				const urlText = url === undefined ? undefined : url.toString()

				const startTime = utcTime(parseInt(time, 10))

				const next = sessions[i + 1]

				const description = [
					schedule.name,
					`Session: ${sessionName}`,
					urlText,
				].join('\n')

				if (next !== undefined) {
					const endTime = utcTime(parseInt(next[0], 10))
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

		if (error !== undefined) console.error(`[iCalExport]`, error)
	}
}
