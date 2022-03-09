import { wideBreakpoint } from 'style/settings'
import styled from 'styled-components'

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	height: 100%;
	td,
	th {
		border: 1px solid ${(props) => props.theme.colors.borderColor};
		padding: 0.25rem;
		@media (min-width: ${wideBreakpoint}) {
			padding: 1rem;
			font-size: 16px;
		}
		vertical-align: middle;
		&:first-child {
			border-left: 0;
		}
		&:last-child {
			border-right: 0;
		}
	}
	td {
		font-size: 14px;
		@media (min-width: ${wideBreakpoint}) {
			font-size: 16px;
		}
	}
	th {
		font-size: 12px;
		@media (min-width: ${wideBreakpoint}) {
			font-size: 14px;
		}
	}
	td.time {
		text-align: right;
		width: 10%;
		white-space: nowrap;
	}
	td.hot {
		background-color: ${(props) => props.theme.colors.countdownWarning};
	}
	th {
		small {
			opacity: 0.5;
		}
	}
`
