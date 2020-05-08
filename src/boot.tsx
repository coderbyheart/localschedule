import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { log } from './log'
import { App } from './App'

const l = (...args: any) => log('App', ...args)

export const boot = ({ target }: { target: HTMLElement }) => {
	l('Version:', GLOBAL_VERSION)
	l('Production:', GLOBAL_IS_PRODUCTION)
	l('Source code:', GLOBAL_GITHUB_URL)
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		target,
	)
}
