import * as React from 'react'
import { Header } from './style/Header'
import { Footer } from './style/Footer'
import { Main, Info } from './style/Main'
import { GlobalStyle } from './style/Global'
import { Schedule } from './Schedule'

import LockIcon from 'feather-icons/dist/icons/lock.svg'
import UnLockIcon from 'feather-icons/dist/icons/unlock.svg'

export const App = () => {
	let cfg = {
		name: 'ExampleConf',
		day: '2020-11-21',
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
		<>
			<GlobalStyle />
			<Header></Header>
			<Main>
				<Schedule
					sessions={cfg.sessions}
					eventTimezoneName={cfg.tz}
					conferenceName={cfg.name}
					conferenceDate={cfg.day}
				/>
				<Info>
					Click the <LockIcon /> icon to create your own schedule. When done,
					click the <UnLockIcon /> and share the updated URL.
				</Info>
			</Main>
			<Footer />
		</>
	)
}
