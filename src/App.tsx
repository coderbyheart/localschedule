import * as React from 'react'
import { useState } from 'react'
import { Footer } from './style/Footer'
import { Main, Info, Headline, Title, TitleActions } from './style/Main'
import { Theme, dark, light } from './style/theme'
import { GlobalStyle } from './style/Global'
import { Schedule } from './Schedule'
import { format } from 'date-fns'
import { ThemeProvider } from 'styled-components'
import {
	Button,
	Input,
	DateEditor,
	StyledDaySelector,
	StyledTimeZoneSelector,
} from './style/Form'
import { Editor } from './Editor'
import { ThemeSwitcher } from './ThemeSwitcher'

import LockIcon from 'feather-icons/dist/icons/lock.svg'
import UnLockIcon from 'feather-icons/dist/icons/unlock.svg'
import EyeOffIcon from 'feather-icons/dist/icons/eye-off.svg'
import EyeIcon from 'feather-icons/dist/icons/eye.svg'

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
		hidePastSessions: false,
	}
	const hash =
		new URLSearchParams(window.location.search).get('schedule') ??
		new URL(window.location.href).hash?.substr(1) ??
		false

	const hidePastSessionsDefault =
		new URLSearchParams(window.location.search).get('hidePastSessions') !== null

	if (hash) {
		const payload = decodeURIComponent(hash)
		cfg = {
			...cfg,
			...JSON.parse(
				payload.substr(0, 3) === 'v2:' ? payload.substr(3) : atob(payload),
			),
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
	const [hidePastSessions, setHidePastSessions] = useState(
		hidePastSessionsDefault,
	)
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
										`${
											new URL(document.location.href).origin
										}#${encodeURIComponent(`v2:${JSON.stringify(cfg)}`)}`,
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
								<StyledDaySelector day={updatedDay} onUpdate={updateDay} />
								<StyledTimeZoneSelector
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
							<TitleActions>
								<Button onClick={() => setHidePastSessions((h) => !h)}>
									{hidePastSessions && <EyeOffIcon />}
									{!hidePastSessions && <EyeIcon />}
								</Button>
								<ThemeSwitcher
									currentTheme={theme}
									darkTheme={dark}
									lightTheme={light}
									onSwitch={updateTheme}
								/>
							</TitleActions>
						</Title>
						<Schedule
							sessions={cfg.sessions}
							eventTimezoneName={cfg.tz}
							conferenceDate={cfg.day}
							hidePastSessions={hidePastSessions}
						/>
					</>
				)}
				<Info>
					<p>
						Click the <LockIcon /> icon to create your own schedule. When done,
						click the <UnLockIcon /> and share the updated URL.
					</p>
					<p>
						<a href="https://www.notion.so/">Notion</a> user? Use{' '}
						<a
							href={`${
								new URL(document.location.href).origin
							}?schedule=${encodeURIComponent(`v2:${JSON.stringify(cfg)}`)}`}
						>
							this URL
						</a>{' '}
						to embed it on any page.
					</p>
				</Info>
			</Main>
			<Footer />
		</ThemeProvider>
	)
}
