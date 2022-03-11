const sessionLinkRegEx =
	/^(.+)\|(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))$/

export const toURL = (url: string): URL | undefined => {
	try {
		return new URL(url)
	} catch {
		console.error(`Invalid URL: ${url}`)
		return undefined
	}
}

export const formatSessionName = (
	name: string,
): { sessionName: string; url?: URL } => {
	let sessionName = name
	let url: URL | undefined = undefined
	const matches = sessionLinkRegEx.exec(name)
	if (matches !== null) {
		sessionName = matches[1]
		url = toURL(matches[2])
	}
	return {
		sessionName,
		url,
	}
}

export const SessionName = ({ name }: { name: string }) => {
	const { sessionName, url } = formatSessionName(name)
	if (url !== undefined)
		return (
			<a href={url.toString()} target="_blank" rel="noreferrer">
				{sessionName}
			</a>
		)
	return <>{sessionName}</>
}
