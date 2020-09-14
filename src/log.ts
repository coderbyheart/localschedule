export const log = (label: string, ...args: any[]): void =>
	console.log(
		`%c${label}`,
		'background-color: #3543ec; color: #ffffff; padding: 0.25rem;',
		...args,
	)
