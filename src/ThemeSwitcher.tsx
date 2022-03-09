import { DarkModeIcon, LightModeIcon } from 'style/FeatherIcons'
import { Button } from 'style/Form'
import type { Theme } from 'style/theme'

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
