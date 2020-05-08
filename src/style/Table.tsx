import styled from 'styled-components'

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	height: 100%;
	td,
	th {
		border: 1px solid #7d7d7d;
		padding: 0.25rem;
		font-size: 12px;
		@media (min-width: 600px) {
			padding: 1rem;
			font-size: 16px;
		}
	}
	td.time {
		text-align: right;
		width: 10%;
		white-space: nowrap;
	}
	td.hot {
		background-color: #ff5e007a;
	}
	th {
		small {
			opacity: 0.5;
		}
	}
`
