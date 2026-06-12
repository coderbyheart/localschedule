import { expect, test } from '@playwright/test'
import { browserWithFixedTime } from './browserWithFixedTime.js'

test.describe('Add to Google Calendar', () => {
	test('the whole schedule should link to Google Calendar as a single event', async () => {
		const context = await browserWithFixedTime()
		const page = await context.newPage()
		await page.goto('http://localhost:8080/')

		const href = await page
			.locator('a[title="Add to Google Calendar"]')
			.getAttribute('href')
		expect(href).not.toBeNull()

		const url = new URL(href as string)
		expect(url.origin).toBe('https://calendar.google.com')
		expect(url.pathname).toBe('/calendar/render')
		expect(url.searchParams.get('action')).toBe('TEMPLATE')
		expect(url.searchParams.get('text')).toBe('ExampleConf')

		// The default schedule is in Europe/Oslo (UTC+1 on 2022-03-11): it spans
		// from the earliest session ("Arrival & Breakfast" at 09:00 = 08:00 UTC)
		// to the end of the latest session (19:46 = 18:46 UTC, +1h = 19:46 UTC).
		expect(url.searchParams.get('dates')).toBe(
			'20220311T080000Z/20220311T194600Z',
		)

		// All sessions are concatenated into the description.
		const details = url.searchParams.get('details') as string
		expect(details).toContain('09:00 Arrival & Breakfast')
		expect(details).toContain('19:00 Evening Activities')
	})
})
