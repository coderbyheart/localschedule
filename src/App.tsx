import * as React from 'react'
import { useState } from 'react'
import { Footer } from './style/Footer'
import { Main, Info, Headline, Title } from './style/Main'
import { Theme, dark, light } from './style/theme'
import { GlobalStyle } from './style/Global'
import { Schedule } from './Schedule'
import { format } from 'date-fns'
import { ThemeProvider } from 'styled-components'
import { Button, Input, DateInput, DateEditor } from './style/Form'
import { Editor } from './Editor'
import { ThemeSwitcher } from './ThemeSwitcher'

import LockIcon from 'feather-icons/dist/icons/lock.svg'
import UnLockIcon from 'feather-icons/dist/icons/unlock.svg'
import { TimeZoneSelector } from './timezones'

export const App = () => {
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
	const [theme, updateTheme] = useState<Theme>(
		window.localStorage.getItem('theme') === 'light' ? light : dark,
	)
	const [updatedName, updateName] = useState(cfg.name)
	const [updatedDay, updateDay] = useState(cfg.day)
	const [updatedTimeZone, updateTimeZone] = useState(cfg.tz)
	const [updatedSessions, updateSessions] = useState(cfg.sessions)
	const [editing, setEditing] = useState(false)
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Main>
				{editing && (
					<>
						<Title>
							<Button
								title="Save changes"
								onClick={() => {
									const cfg = {
										name: updatedName,
										day: updatedDay,
										tz: updatedTimeZone,
										sessions: updatedSessions,
									}
									window.location.assign(
										`${document.location.href.replace(
											/#.+/,
											'',
										)}#${encodeURIComponent(btoa(JSON.stringify(cfg)))}`,
									)
									setEditing(false)
								}}
							>
								<UnLockIcon />
							</Button>
							<DateEditor>
								<Input
									type="text"
									value={updatedName}
									onChange={({ target: { value } }) => updateName(value)}
								/>
								<DateInput
									type="date"
									value={updatedDay}
									onChange={({ target: { value } }) => updateDay(value)}
								/>
								<TimeZoneSelector
									value={updatedTimeZone}
									onChange={({ target: { value } }) => updateTimeZone(value)}
								/>
							</DateEditor>
							<ThemeSwitcher
								currentTheme={theme}
								darkTheme={dark}
								lightTheme={light}
								onSwitch={updateTheme}
							/>
						</Title>
						<Editor
							onAdd={(add) => {
								updateSessions((sessions) => ({
									...sessions,
									[parseInt(`${add.hour}${add.minute}`, 10)]: add.name,
								}))
							}}
							onDelete={(time) => {
								updateSessions((sessions) => {
									const s = { ...sessions }
									delete (s as { [key: number]: string })[time]
									return s
								})
							}}
							conferenceDate={updatedDay}
							eventTimezoneName={updatedTimeZone}
							sessions={updatedSessions}
						/>
					</>
				)}
				{!editing && (
					<>
						<Title>
							<Button
								title="Edit schedule"
								onClick={() => {
									setEditing(true)
								}}
							>
								<LockIcon />
							</Button>
							<Headline>
								{updatedName}: {updatedDay}
							</Headline>
							<ThemeSwitcher
								currentTheme={theme}
								darkTheme={dark}
								lightTheme={light}
								onSwitch={updateTheme}
							/>
						</Title>
						<Schedule
							sessions={cfg.sessions}
							eventTimezoneName={cfg.tz}
							conferenceDate={cfg.day}
						/>
					</>
				)}
				<Info>
					<p>
						Click the <LockIcon /> icon to create your own schedule. When done,
						click the <UnLockIcon /> and share the updated URL.
					</p>
				</Info>
			</Main>
			<Footer />
		</ThemeProvider>
	)
}