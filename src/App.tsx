import * as React from 'react'
import { useState } from 'react'
import { Footer } from './style/Footer'
import { Main, Info } from './style/Main'
import { Theme, dark, light } from './style/theme'
import { GlobalStyle } from './style/Global'
import { Schedule } from './Schedule'
import { format } from 'date-fns'
import { ThemeProvider } from 'styled-components'

import LockIcon from 'feather-icons/dist/icons/lock.svg'
import UnLockIcon from 'feather-icons/dist/icons/unlock.svg'
import LightModeIcon from 'feather-icons/dist/icons/sun.svg'
import DarkModeIcon from 'feather-icons/dist/icons/moon.svg'
import { Button } from './style/Form'

export const App = () => {
	const [theme, updateTheme] = useState<Theme>(
		window.localStorage.getItem('theme') === 'light' ? light : dark,
	)
	let cfg = {
		name: 'ExampleConf',
		day: format(new Date(), 'yyyy-MM-dd'),
		tz: 'Europe/Oslo',
		sessions: {
			900: 'Arrival & Breakfast',
			930: 'Opening & Marketplace',
			1030: 'Session 1',
			1130: 'Coffee Break',
			1145: 'Session 2',
			1245: 'Lunch Break',
			1430: 'Session 3',
			1530: 'Coffee Break',
			1545: 'Session 4',
			1645: 'Coffee Break',
			1700: 'Closing & Retro',
			1730: 'Dinner Break',
			1900: 'Evening Activities',
		},
	}
	const hash = new URL(window.location.href).hash?.substr(1) ?? false

	if (hash) {
		cfg = {
			...cfg,
			...JSON.parse(atob(decodeURIComponent(hash))),
		}
		console.log(cfg)
	}
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Main>
				<Schedule
					sessions={cfg.sessions}
					eventTimezoneName={cfg.tz}
					conferenceName={cfg.name}
					conferenceDate={cfg.day}
				/>
				<Info>
					<p>
						Click the <LockIcon /> icon to create your own schedule. When done,
						click the <UnLockIcon /> and share the updated URL.
					</p>
				</Info>
				<Info>
					{theme === dark && (
						<Button
							onClick={() => {
								updateTheme(light)
								window.localStorage.setItem('theme', 'light')
							}}
						>
							<LightModeIcon /> switch to light mode
						</Button>
					)}
					{theme === light && (
						<Button
							onClick={() => {
								updateTheme(dark)
								window.localStorage.setItem('theme', 'dark')
							}}
						>
							<DarkModeIcon /> switch to dark mode
						</Button>
					)}
				</Info>
			</Main>
			<Footer />
		</ThemeProvider>
	)
}
