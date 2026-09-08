import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TimeZoneSelector, timezones } from './timezones.tsx'

describe('TimeZoneSelector', () => {
	it('should include every timezone by name in its option label', () => {
		const { container } = render(<TimeZoneSelector />)
		const options = [...container.querySelectorAll('option')]
		expect(options.length).toBe(timezones.length)
		for (const option of options) {
			expect(option.textContent).toContain(option.value)
		}
	})
	it('should label Europe/Oslo with its city and full name', () => {
		const { container } = render(
			<TimeZoneSelector value="Europe/Oslo" onChange={() => undefined} />,
		)
		expect(
			container.querySelector('option[value="Europe/Oslo"]')?.textContent,
		).toBe('Oslo (Europe/Oslo)')
	})
	it('should list well-known timezones', () => {
		expect(timezones).toContain('Europe/Oslo')
		expect(timezones).toContain('Asia/Tokyo')
		expect(timezones).toContain('America/New_York')
	})
	it('should cover timezones missing from the legacy hardcoded list', () => {
		// Africa/Addis_Ababa was not in the hardcoded list: it is only
		// present when the list is sourced by name from the platform.
		expect(timezones).toContain('Africa/Addis_Ababa')
	})
})
