import { App } from 'app/App'
import { log } from 'app/log'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'

const l = (...args: any) => log('App', ...args)
l('Version:', import.meta.env.PUBLIC_VERSION)
l('Source code:', import.meta.env.PUBLIC_HOMEPAGE)

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root'),
)
