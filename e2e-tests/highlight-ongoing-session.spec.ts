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
})
