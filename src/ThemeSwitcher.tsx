import * as React from 'react'
import { Theme } from './style/theme'
import { Button } from './style/Form'

import LightModeIcon from 'feather-icons/dist/icons/sun.svg'
import DarkModeIcon from 'feather-icons/dist/icons/moon.svg'

export const ThemeSwitcher = ({
	currentTheme,
	darkTheme,
	lightTheme,
	onSwitch,
}: {
	currentTheme: Theme
	darkTheme: Theme
	lightTheme: Theme
	onSwitch: (theme: Theme) => void
}) => (
	<>
		{currentTheme === darkTheme && (
			<Button
				title="switch to light mode"
				onClick={() => {
					onSwitch(lightTheme)
					window.localStorage.setItem('theme', 'light')
				}}
			>
				<LightModeIcon />
			</Button>
		)}
		{currentTheme === lightTheme && (
			<Button
				title="switch to dark mode"
				onClick={() => {
					onSwitch(darkTheme)
					window.localStorage.setItem('theme', 'dark')
				}}
			>
				<DarkModeIcon />
			</Button>
		)}
	</>
)
