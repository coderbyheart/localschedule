import styled from 'styled-components'

export const Button = styled.button`
	background-color: transparent;
	color: #fff;
	opacity: 0.75;
	padding: 0;
	border: 0;
	float: right;
`

export const DeleteButton = styled(Button)`
	color: #ff5235;
`

export const AddButton = styled(Button)`
	color: #0fa;
`

export const Input = styled.input`
	background-color: transparent;
	border: 1px solid #fff;
	padding: 0.5rem;
	height: 30px;
	color: #fff;
`

export const DateInput = styled(Input)`
	margin: 0;
`
export const NumberInput = styled(Input)`
	width: 50px;
	& + & {
		margin-left: 0.5rem;
	}
`
