import { DarkModeIcon, LightModeIcon } from 'app/FeatherIcons'
import formStyles from 'app/Form.module.css'

export enum Theme {
	light = 'light',
	dark = 'dark',
}

export const ThemeSwitcher = ({
	currentTheme,
	onSwitch,
}: {
	currentTheme: Theme
	onSwitch: (theme: Theme) => void
}) => (
	<>
		{currentTheme === Theme.dark && (
			<button
				className={formStyles.Button}
				title="switch to light mode"
				onClick={() => {
					onSwitch(Theme.light)
					window.localStorage.setItem('theme', Theme.light)
				}}
			>
				<LightModeIcon />
			</button>
		)}
		{currentTheme === Theme.light && (
			<button
				className={formStyles.Button}
				title="switch to dark mode"
				onClick={() => {
					onSwitch(Theme.dark)
					window.localStorage.setItem('theme', Theme.dark)
				}}
			>
				<DarkModeIcon />
			</button>
		)}
	</>
)
