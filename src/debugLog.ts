export const debugLog = (label: string, ...args: any) =>
	console.debug(
		`%c${label}`,
		'background-color: #80cbc8; color: #000000; padding: 0.25rem;',
		...args,
	)
