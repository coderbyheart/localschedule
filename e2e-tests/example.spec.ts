import { BrowserContext, chromium, expect, test } from '@playwright/test'
import path from 'path'
import sinon from 'sinon'

test.describe('Adding an item', () => {
	let context: BrowserContext
	test.beforeAll(async () => {
		const browser = await chromium.launch() // Or 'firefox' or 'webkit'.
		context = await browser.newContext({
			locale: 'no-NO',
			timezoneId: 'Europe/Berlin',
		})
		// See https://github.com/microsoft/playwright/issues/6347#issuecomment-965887758
		await context.addInitScript({
			path: path.join(process.cwd(), 'node_modules/sinon/pkg/sinon.js'),
		})
		// Auto-enable sinon right away
		// and enforce our "current" date
		await context.addInitScript(() => {
			const clock = sinon.useFakeTimers()
			clock.setSystemTime(new Date('2022-03-11T12:00:00Z'))
			;(window as any).__clock = clock
		})
	})

	test('should allow me to add todo items', async () => {
		const page = await context.newPage()
		await page.goto('http://localhost:8080/')

		// Create a new entry
		await page.locator('button[name="edit-schedule"]').click()
		await page.locator('input[name="conference-day"]').fill('2022-03-12')
		await page
			.locator('select[name="conference-timezone"]')
			.selectOption('Asia/Tokyo')
		await page.locator('input[name="session-hour"]').fill('9')
		await page.locator('input[name="session-minute"]').fill('45')

		const sessionName = 'Breakfast for Champions'
		const sessionNameInput = page.locator('input[name="session-name"]')
		await sessionNameInput.fill(sessionName)
		await sessionNameInput.press('Enter')

		await page.locator('button[name="save-schedule"]').click()

		// Table should have the new entry
		await expect(page.locator('table tbody')).toContainText(sessionName)

		// Find the row of the new entry
		const tr = page
			.locator(`table tbody td:has-text("${sessionName}")`) // td
			.locator(`xpath=ancestor::tr`)
		const conferenceTime = tr.locator('td:first-child')
		await expect(conferenceTime).toContainText('09:45')

		// Time Zone difference between Berlin and Tokyo on 2022-03-12 is 8 hours

		const localTime = tr.locator('td:nth-child(2)')
		await expect(localTime).toContainText('01:45')
	})

	test('should display the users time zone', async () => {
		const page = await context.newPage()
		await page.goto('http://localhost:8080/')

		await expect(
			page.locator('table thead th:nth-child(2) small'),
		).toContainText('Berlin')
	})
})
