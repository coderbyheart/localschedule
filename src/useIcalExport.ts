import { scheduleEvents } from './scheduleEvents.ts'
import { createEvents, type EventAttributes } from 'ics'

export const useIcalExport = (schedule: Schedule) => {
	return (): void => {
		const { error, value } = createEvents(
			scheduleEvents(schedule).map(
				({ title, start, end, url, description, location }): EventAttributes => ({
					title,
					start: [
						start.getUTCFullYear(),
						start.getUTCMonth() + 1,
						start.getUTCDate(),
						start.getUTCHours(),
						start.getUTCMinutes(),
					],
					startInputType: 'utc',
					end: [
						end.getUTCFullYear(),
						end.getUTCMonth() + 1,
						end.getUTCDate(),
						end.getUTCHours(),
						end.getUTCMinutes(),
					],
					endInputType: 'utc',
					url,
					description,
					location,
				}),
			),
		)

		if (value !== undefined && value !== null) {
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
