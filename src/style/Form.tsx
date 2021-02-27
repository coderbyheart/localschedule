import styled from 'styled-components'
import { DaySelector } from '../DaySelector'
import { TimeZoneSelector } from '../timezones'
import { wideBreakpoint, mobileBreakpoint } from './settings'

export const Button = styled.button`
	background-color: transparent;
	color: ${(props) => props.theme.colors.text};
	opacity: 0.75;
	padding: 0;
	border: 0;
	display: flex;
	align-items: center;
	svg {
		margin-right: 0.5rem;
	}
`

export const DeleteButton = styled(Button)`
	color: ${(props) => props.theme.colors.delete};
`

export const AddButton = styled(Button)`
	color: ${(props) => props.theme.colors.add};
	&:disabled {
		color: ${(props) => props.theme.colors.addDisabled};
	}
`

export const Input = styled.input`
	background-color: transparent;
	border: 1px solid ${(props) => props.theme.colors.text};
	padding: 0.25rem 0.5rem;
	height: 30px;
	color: ${(props) => props.theme.colors.text};
`

export const StyledDaySelector = styled(DaySelector)`
	background-color: transparent;
	border: 1px solid ${(props) => props.theme.colors.text};
	padding: 0.25rem 0.5rem;
	height: 30px;
	color: ${(props) => props.theme.colors.text};
	margin: 0;
	::-webkit-calendar-picker-indicator {
		filter: ${(props) => props.theme.calendarPickerIndicatorFilter};
	}
`

export const StyledTimeZoneSelector = styled(TimeZoneSelector)`
	background-color: transparent;
	border: 1px solid ${(props) => props.theme.colors.text};
	padding: 0.25rem 0.5rem;
	height: 40px;
	color: ${(props) => props.theme.colors.text};
	option {
		color: black;
	}
	margin: 0;
`

export const NumberInput = styled(Input)`
	width: 30px;
	@media (min-width: ${mobileBreakpoint}) {
		width: 60px;
	}
`

export const DateEditor = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (min-width: ${wideBreakpoint}) {
		flex-direction: row;
	}
`
