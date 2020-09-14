export const handleError = (label: string) => (error: Error): void =>
	console.log(
		`%c${label} Error`,
		'background-color: #cb3837; color: #ffffff; padding: 0.25rem;',
		error.message,
		error,
	)
