import styles from 'app/App.module.css'
import { DaySelector } from 'app/DaySelector'
import { Editor } from 'app/Editor'
import { EyeIcon, EyeOffIcon, LockIcon, UnLockIcon } from 'app/FeatherIcons'
import { Footer } from 'app/Footer'
import formStyles from 'app/Form.module.css'
import { Schedule } from 'app/Schedule'
import { Theme, ThemeSwitcher } from 'app/ThemeSwitcher'
import { TimeZoneSelector } from 'app/timezones'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

let defaultTheme = Theme.light
if (typeof window.matchMedia === 'function') {
	const match = window.matchMedia('(prefers-color-scheme: dark)')
	defaultTheme = match.matches ? Theme.dark : Theme.light
}

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
			1946: `You can add links, too!|${import.meta.env.PUBLIC_HOMEPAGE}`,
		},
		hidePastSessions: false,
	}
	const hash =
		new URLSearchParams(window.location.search).get('schedule') ??
		new URL(window.location.href).hash?.slice(1) ??
		false

	const hidePastSessionsDefault =
		new URLSearchParams(window.location.search).get('hidePastSessions') !== null

	if (hash) {
		const payload = decodeURIComponent(hash)
		cfg = {
			...cfg,
			...JSON.parse(
				payload.startsWith('v2:') ? payload.slice(3) : atob(payload),
			),
		}
	}
	const [theme, updateTheme] = useState<Theme>(
		(window.localStorage.getItem('theme') ?? defaultTheme) === 'dark'
			? Theme.dark
			: Theme.light,
	)
	const [updatedName, updateName] = useState(cfg.name)
	const [updatedDay, updateDay] = useState(cfg.day)
	const [updatedTimeZone, updateTimeZone] = useState(cfg.tz)
	const [updatedSessions, updateSessions] = useState(cfg.sessions)
	const [editing, setEditing] = useState(false)
	const [hidePastSessions, setHidePastSessions] = useState(
		hidePastSessionsDefault,
	)

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	return (
		<>
			<main>
				{editing && (
					<>
						<div className={styles.Title}>
							<button
								className={formStyles.Button}
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
							</button>
							<div className={formStyles.DateEditor}>
								<input
									className={formStyles.Input}
									type="text"
									value={updatedName}
									onChange={({ target: { value } }) => updateName(value)}
								/>
								<DaySelector day={updatedDay} onUpdate={updateDay} />
								<TimeZoneSelector
									value={updatedTimeZone}
									onChange={({ target: { value } }) => updateTimeZone(value)}
								/>
							</div>
							<ThemeSwitcher currentTheme={theme} onSwitch={updateTheme} />
						</div>
						<Editor
							onAdd={(add) => {
								updateSessions((sessions) => ({
									...sessions,
									[parseInt(`${add.hour}${add.minute}`, 10)]: `${add.name}${
										add.url === '' ? '' : `|${add.url.toString()}`
									}`,
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
						<div className={styles.Title}>
							<button
								className={formStyles.Button}
								title="Edit schedule"
								onClick={() => {
									setEditing(true)
								}}
							>
								<LockIcon />
							</button>
							<h1 className={styles.Headline}>
								{updatedName}: {updatedDay}
							</h1>
							<div className="actions">
								<button
									className={formStyles.Button}
									title="Hide past sessions"
									onClick={() => setHidePastSessions((h) => !h)}
								>
									{hidePastSessions && <EyeOffIcon />}
									{!hidePastSessions && <EyeIcon />}
								</button>
								<ThemeSwitcher currentTheme={theme} onSwitch={updateTheme} />
							</div>
						</div>
						<Schedule
							sessions={cfg.sessions}
							eventTimezoneName={cfg.tz}
							conferenceDate={cfg.day}
							hidePastSessions={hidePastSessions}
						/>
					</>
				)}
				<div className={styles.Info}>
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
				</div>
			</main>
			<Footer />
		</>
	)
}
