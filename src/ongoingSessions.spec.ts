import { ConfDateWithSessions, ongoingSessions } from 'app/ongoingSessions'
import { format } from 'date-fns'

const makeSchedule = (now: Date): ConfDateWithSessions => ({
	day: format(now, 'yyyy-MM-dd'),
	tz: 'Europe/Oslo',
	sessions: {
		900: 'Arrival & Breakfast',
		930: 'Opening & Marketplace',
		1030: 'Session 1',
		1130: 'Coffee Break',
		1145: 'Session 2',
		1245: 'Lunch Break',
		1430: 'Session 3',
		1530: 'Coffee Break',
		1545: 'Session 4',
		'1545@Main hall': `You can have sessions at the same time, too!`,
		1645: 'Coffee Break',
		1700: 'Closing & Retro',
		1730: 'Dinner Break',
		1900: 'Evening Activities',
	},
})

describe('ongoingSessions()', () => {
	it('should mark one ongoing session', () => {
		const now = new Date('2022-03-11T13:00:00+01:00')
		expect(ongoingSessions(makeSchedule(now), now)).toEqual({
			1245: 'Lunch Break',
		})
	})

	it('should mark to parallel ongoing sessions', () => {
		const now = new Date('2022-03-11T16:00:00+01:00')
		expect(ongoingSessions(makeSchedule(now), now)).toEqual({
			1545: 'Session 4',
			'1545@Main hall': `You can have sessions at the same time, too!`,
		})
	})
})
