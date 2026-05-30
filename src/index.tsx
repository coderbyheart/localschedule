import { App } from './App.tsx'
import { log } from './log.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './sentry.ts'

const l = (...args: any) => log('App', ...args)
l('Version:', import.meta.env.PUBLIC_VERSION)
l('Source code:', import.meta.env.PUBLIC_HOMEPAGE)

const container = document.getElementById('root')
if (container !== null) {
	const root = createRoot(container) // createRoot(container!) if you use TypeScript
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
} else {
	console.error('Could not find root element!')
}
