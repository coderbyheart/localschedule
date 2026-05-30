import { BrowserContext, chromium } from '@playwright/test'
import path from 'path'

export const browserWithFixedTime = async (
	time?: Date,
): Promise<BrowserContext> => {
	const browser = await chromium.launch()
	const context = await browser.newContext({
		locale: 'no-NO',
		timezoneId: 'Europe/Berlin',
	})
	// See https://github.com/microsoft/playwright/issues/6347#issuecomment-965887758
	await context.addInitScript({
		path: path.join(process.cwd(), 'node_modules/sinon/pkg/sinon.js'),
	})
	// Auto-enable sinon right away
	// and enforce our "current" date.
	// Only fake `Date`: faking the timer functions (setTimeout,
	// requestAnimationFrame, queueMicrotask, ...) stalls React's scheduler
	// and leaves the app unrendered.
	await context.addInitScript(`
		const clock = sinon.useFakeTimers({
			now: ${(time ?? new Date('2022-03-11T12:00:00Z')).getTime()},
			toFake: ['Date'],
		})
		window.__clock = clock
		`)

	return context
}
