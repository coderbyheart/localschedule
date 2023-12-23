declare module '*.svg' {
	const ref: string
	export default ref
}
declare module '*.png' {
	const ref: string
	export default ref
}

declare module '*.css'

interface ImportMeta {
	hot: {
		accept: Function
		dispose: Function
	}
	env: {
		// Vite built-in
		MODE: string
		BASE_URL?: string
		// Custom
		PUBLIC_VERSION: string
		PUBLIC_HOMEPAGE: string
		PUBLIC_ISSUES: string
		PUBLIC_MANIFEST_NAME: string
		PUBLIC_MANIFEST_SHORT_NAME: string
		PUBLIC_MANIFEST_THEME_COLOR: string
		PUBLIC_MANIFEST_BACKGROUND_COLOR: string
		PUBLIC_SENTRY_DSN: string
	}
}

type Sessions = Record<string, string>

type Schedule = {
	name: string
	day: string
	tz: string
	sessions: Sessions
	hidePastSessions: boolean
}
