import { AddIcon, DeleteIcon } from 'app/FeatherIcons'
import formStyles from 'app/Form.module.css'
import { SessionName } from 'app/SessionName'
import tableStyles from 'app/Table.module.css'
import { formatEventTime, toEventTime } from 'app/time'
import { useRef, useState } from 'react'

type AddSession = {
	name: string
	hour: string
	minute: string
	url: string
}

const toNumber = (n: string) => {
	try {
		return parseInt(n, 10)
	} catch {
		return null
	}
}

const urlRegex =
	/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/

export const Editor = ({
	conferenceDate,
	sessions,
	onAdd,
	onDelete,
}: {
	conferenceDate: string
	eventTimezoneName: string
	sessions: { [key: number]: string }
	onAdd: (newSession: AddSession) => void
	onDelete: (time: number) => void
}) => {
	const [add, updateAdd] = useState<AddSession>({
		name: '',
		hour: '19',
		minute: '45',
		url: '',
	})
	const inputRef = useRef<HTMLInputElement>(null)
	const isInputValid = () => {
		const hour = toNumber(add.hour)
		const minute = toNumber(add.minute)
		const urlIsValid = add.url !== '' ? urlRegex.test(add.url) : true
		return (
			add.name.length > 0 &&
			hour !== null &&
			hour >= 0 &&
			hour <= 23 &&
			minute !== null &&
			minute >= 0 &&
			minute <= 59 &&
			urlIsValid
		)
	}

	const userTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone
	const eventTime = toEventTime({ conferenceDate, userTimeZone })

	const addAction = (add: AddSession) => {
		onAdd(add)
		updateAdd({
			...add,
			name: '',
			url: '',
		})
		inputRef.current?.focus()
	}

	return (
		<>
			<table className={tableStyles.Table}>
				<thead>
					<tr>
						<th></th>
						<th>Conf Time</th>
						<th>Session</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<button
								className={formStyles.AddButton}
								disabled={!isInputValid()}
								onClick={() => {
									addAction(add)
								}}
							>
								<AddIcon />
							</button>
						</td>
						<td className="time">
							<input
								className={formStyles.NumberInput}
								ref={inputRef}
								type="text"
								inputMode="numeric"
								value={add.hour}
								onChange={({ target: { value } }) => {
									updateAdd({
										...add,
										hour: value,
									})
								}}
							/>
							{':'}
							<input
								className={formStyles.NumberInput}
								type="text"
								inputMode="numeric"
								value={add.minute}
								onChange={({ target: { value } }) => {
									updateAdd({
										...add,
										minute: value,
									})
								}}
							/>
						</td>
						<td>
							<form className={formStyles.Form}>
								<fieldset>
									<label htmlFor="name">Session name</label>
									<input
										className={formStyles.TextInput}
										type="text"
										value={add.name}
										id={'name'}
										onKeyUp={({ key }) => {
											if (key === 'Enter') {
												if (isInputValid()) {
													addAction(add)
													onAdd(add)
												}
											}
										}}
										onChange={({ target: { value } }) =>
											updateAdd({
												...add,
												name: value,
											})
										}
										placeholder='e.g. "Intro Session"'
									/>
								</fieldset>
								<fieldset>
									<label htmlFor="url">
										Optional: URL to use as a hyperlink.
									</label>
									<input
										className={formStyles.TextInput}
										type="url"
										id="url"
										value={add.url ?? ''}
										onChange={({ target: { value } }) =>
											updateAdd({
												...add,
												url: value,
											})
										}
										onKeyUp={({ key }) => {
											if (key === 'Enter') {
												if (isInputValid()) {
													addAction(add)
													onAdd(add)
												}
											}
										}}
										placeholder='e.g. "https://example.com/"'
									/>
								</fieldset>
							</form>
						</td>
					</tr>
					{Object.entries(sessions).map(([time, name]) => (
						<tr key={time}>
							<td>
								<button
									className={formStyles.DeleteButton}
									onClick={() => {
										onDelete(time as unknown as number)
									}}
								>
									<DeleteIcon />
								</button>
							</td>
							<td className={'time'}>
								{formatEventTime(eventTime(time as unknown as number))}
							</td>
							<td>
								<SessionName name={name} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
