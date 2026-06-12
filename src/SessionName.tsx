import { formatSessionName } from './formatSessionName.ts'

export { formatSessionName, toURL } from './formatSessionName.ts'

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
