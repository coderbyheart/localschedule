import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/browser'

const enableSentry = import.meta.env.PUBLIC_SENTRY_DSN !== undefined

if (enableSentry) {
	console.debug(`Sentry enabled.`)
	Sentry.init({
		dsn: import.meta.env.PUBLIC_SENTRY_DSN,
		integrations: [new BrowserTracing()],
		tracesSampleRate: 0.05,
		beforeSend: (event) => {
			if (event.contexts?.device?.name?.includes('HeadlessChrome') ?? false) return null
			return event
		}
	})
	Sentry.setContext('app', {
		version: import.meta.env.PUBLIC_VERSION,
	})
} else {
	console.debug(`Sentry disabled.`)
}

export const captureMessage = (message: string): void => {
	console.debug(message)
	if (!enableSentry) return
	Sentry.captureMessage(message)
}
