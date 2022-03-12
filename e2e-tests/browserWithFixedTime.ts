import { BrowserContext, chromium } from '@playwright/test'
import path from 'path'
import sinon from 'sinon'

export const browserWithFixedTime = async (): Promise<BrowserContext> => {
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
	// and enforce our "current" date
	await context.addInitScript(() => {
		const clock = sinon.useFakeTimers()
		clock.setSystemTime(new Date('2022-03-11T12:00:00Z'))
		;(window as any).__clock = clock
	})

	return context
}
