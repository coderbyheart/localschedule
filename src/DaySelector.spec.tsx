import * as React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { DaySelector } from './DaySelector'

describe('DaySelector', () => {
	it('should update with a correct date', () => {
		let updatedDay = ''
		const { getByLabelText } = render(
			<DaySelector
				day={'2021-02-27'}
				onUpdate={(newDay) => {
					updatedDay = newDay
				}}
			/>,
		)
		const input = getByLabelText('date-input')
		fireEvent.change(input, {
			target: { value: '2021-02-28' },
		})
		expect(updatedDay).toBe('2021-02-28')
		expect((input as HTMLInputElement).value).toBe('2021-02-28')
	})
	it('should not update with an incorret/partial date', () => {
		let updatedDay: string | undefined = undefined
		const { getByLabelText } = render(
			<DaySelector
				day={'2021-02-27'}
				onUpdate={(newDay) => {
					updatedDay = newDay
				}}
			/>,
		)
		const input = getByLabelText('date-input')
		// it should not update on invalid date
		fireEvent.change(input, {
			target: { value: '2021-0-28' },
		})
		// This invalid browser behaviour can't be tested
		// In Safari this would work:
		// expect((input as HTMLInputElement).value).toBe('2021-0-28') // should however show invalid input
		expect(updatedDay).toBe(undefined)
		// it should update with valid date'
		fireEvent.change(input, {
			target: { value: '2021-03-28' },
		})
		expect(updatedDay).toBe('2021-03-28')
		expect((input as HTMLInputElement).value).toBe('2021-03-28')
	})
})
