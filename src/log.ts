export const log = (label: string, ...args: any) =>
	console.log(
		`%c${label}`,
		'background-color: #3543ec; color: #ffffff; padding: 0.25rem;',
		...args,
	)
