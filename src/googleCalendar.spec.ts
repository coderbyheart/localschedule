import {
	googleCalendarEventUrl,
	googleCalendarScheduleUrl,
	toGoogleCalendarDate,
} from './googleCalendar.ts'
import { type ScheduleEvent } from './scheduleEvents.ts'
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

describe('toGoogleCalendarDate()', () => {
	it('should format a date as a UTC timestamp', () => {
		assert.equal(
			toGoogleCalendarDate(new Date('2022-03-11T08:00:00Z')),
			'20220311T080000Z',
		)
	})
})

describe('googleCalendarEventUrl()', () => {
	const event: ScheduleEvent = {
		key: '900',
		title: 'ExampleConf: Arrival & Breakfast',
		sessionName: 'Arrival & Breakfast',
		start: new Date('2022-03-11T08:00:00Z'),
		end: new Date('2022-03-11T08:30:00Z'),
		description: 'ExampleConf\nSession: Arrival & Breakfast\n',
		location: undefined,
	}

	it('should build a link to add the event to Google Calendar', () => {
		const url = new URL(googleCalendarEventUrl(event))
		assert.equal(url.origin, 'https://calendar.google.com')
		assert.equal(url.pathname, '/calendar/render')
		assert.equal(url.searchParams.get('action'), 'TEMPLATE')
		assert.equal(url.searchParams.get('text'), 'ExampleConf: Arrival & Breakfast')
		assert.equal(
			url.searchParams.get('dates'),
			'20220311T080000Z/20220311T083000Z',
		)
		assert.equal(
			url.searchParams.get('details'),
			'ExampleConf\nSession: Arrival & Breakfast\n',
		)
	})

	it('should include the track as the location', () => {
		const url = new URL(
			googleCalendarEventUrl({ ...event, location: 'Main hall' }),
		)
		assert.equal(url.searchParams.get('location'), 'Main hall')
	})

	it('should omit the location when there is no track', () => {
		const url = new URL(googleCalendarEventUrl(event))
		assert.equal(url.searchParams.get('location'), null)
	})
})

describe('googleCalendarScheduleUrl()', () => {
	const schedule: Schedule = {
		name: 'ExampleConf',
		day: '2022-03-11',
		tz: 'Europe/Oslo',
		sessions: {
			900: 'Arrival & Breakfast',
			930: 'Opening',
			1030: 'Closing',
			'1030@Main hall': 'Panel|https://example.com',
		},
		hidePastSessions: false,
	}

	it('should span the whole schedule in a single event', () => {
		const url = new URL(googleCalendarScheduleUrl(schedule) as string)
		assert.equal(url.searchParams.get('action'), 'TEMPLATE')
		assert.equal(url.searchParams.get('text'), 'ExampleConf')
		// Earliest start (09:00 Oslo = 08:00 UTC) to latest end
		// (last session 10:30 Oslo = 09:30 UTC, +1h = 10:30 UTC).
		assert.equal(
			url.searchParams.get('dates'),
			'20220311T080000Z/20220311T103000Z',
		)
	})

	it('should list all sessions in the description', () => {
		const url = new URL(googleCalendarScheduleUrl(schedule) as string)
		assert.equal(
			url.searchParams.get('details'),
			[
				'ExampleConf',
				'',
				'09:00 Arrival & Breakfast',
				'09:30 Opening',
				'10:30 Closing',
				'10:30 Panel (Main hall) https://example.com/',
			].join('\n'),
		)
	})

	it('should return undefined for an empty schedule', () => {
		assert.equal(
			googleCalendarScheduleUrl({ ...schedule, sessions: {} }),
			undefined,
		)
	})
})
