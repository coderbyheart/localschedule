import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
	testDir: './e2e-tests',
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	use: {
		trace: 'on-first-retry',
		video: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
	],
	webServer: {
		command: 'npm start',
		url: 'http://localhost:8080/',
		timeout: 10 * 1000,
		reuseExistingServer: process.env.CI === undefined,
	},
}

export default config
