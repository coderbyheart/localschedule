import { App } from 'app/App'
import { log } from 'app/log'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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
