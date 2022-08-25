import { expect, test } from '@playwright/test'
import { browserWithFixedTime } from './browserWithFixedTime.js'

test.describe('Highlight ongoing session', () => {
	test('the currently ongoing session should be highlighted', async () => {
		const context = await browserWithFixedTime()
		const page = await context.newPage()
		await page.goto('http://localhost:8080/')
		await expect(
			page.locator('td:has-text("Lunch Break") >> xpath=ancestor::tr'),
		).toHaveClass('ongoing')
		// There should only be one highlighted row
		await expect(page.locator('tr.ongoing')).toHaveCount(1)
	})
	test('highlight parallel sessions', async () => {
		const context = await browserWithFixedTime(new Date('2022-03-11T15:00:00Z'))
		const page = await context.newPage()
		await page.goto('http://localhost:8080/')
		await expect(
			page.locator('td:has-text("Session 4") >> xpath=ancestor::tr'),
		).toHaveClass('ongoing')
		await expect(
			page.locator(
				'td:has-text("You can have sessions at the same time, too!") >> xpath=ancestor::tr',
			),
		).toHaveClass('ongoing')
		await expect(page.locator('tr.ongoing')).toHaveCount(2)
	})
})
