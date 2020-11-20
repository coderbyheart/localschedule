import styled from 'styled-components'
import { wideBreakpoint } from './settings'

export const Main = styled.main``

export const Info = styled.div`
	text-align: center;
	font-size: 14px;
	margin: 1rem;
	display: flex;
	justify-content: center;
`

export const Headline = styled.h1`
	font-size: 16px;
	@media (min-width: ${wideBreakpoint}) {
		font-size: 22px;
	}
`

export const TitleActions = styled.div``

export const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.25rem;
	@media (min-width: ${wideBreakpoint}) {
		padding: 1rem;
		font-size: 16px;
	}
	h1 {
		margin: 0;
	}
	${TitleActions} {
		display: flex;
	}
`
