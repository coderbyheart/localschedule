import 'styled-components'

export type Theme = {
	colors: {
		background: string
		text: string
		delete: string
		add: string
		addDisabled: string
		countdownWarning: string
		borderColor: string
	}
}

declare module 'styled-components' {
	export interface DefaultTheme extends Theme {} // eslint-disable-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
}

export const dark: Theme = {
	colors: {
		background: '#000',
		text: '#fff',
		delete: '#ff5235',
		add: '#0fa',
		addDisabled: '#aaa',
		countdownWarning: '#ff5e007a',
		borderColor: '#7d7d7d',
	},
}

export const light: Theme = {
	colors: {
		background: '#fffbf6',
		text: '#000000cc',
		add: '#22a00d',
		addDisabled: '#aaa',
		delete: '#dc2000',
		countdownWarning: '#ff000052',
		borderColor: '#a7a7a7',
	},
}
