import { GithubIcon } from 'style/FeatherIcons'
import { wideBreakpoint } from 'style/settings'
import styled from 'styled-components'

const StyledFooter = styled.footer`
	padding: 1rem 2rem;
	opacity: 0.75;
	@media (min-width: ${wideBreakpoint}) {
		padding: 4rem;
	}

	color: ${(props) => props.theme.colors.text};
	a {
		color: ${(props) => props.theme.colors.text};
	}
	p {
		line-height: 1.5rem;
	}
`

const Section = styled.section`
	max-width: ${wideBreakpoint};
	margin: auto;
`
const Copyright = styled(Section)`
	font-size: 80%;
	opacity: 0.8;
	text-align: center;
	margin-top: 2rem;
	@media (min-width: ${wideBreakpoint}) {
		margin-top: 4rem;
	}
`

const Nav = styled.nav`
	a {
		margin: 0 0.5rem;
	}
`

export const Footer = () => (
	<StyledFooter>
		<Copyright>
			<Nav>
				<a
					href={import.meta.env.PUBLIC_HOMEPAGE}
					rel="noopener noreferrer"
					target="_blank"
					title={'Contribute to this project on GitHub'}
				>
					<GithubIcon />
				</a>
			</Nav>
			<p>
				&copy; 2020&mdash;2022{' '}
				<a
					href="https://coderbyheart.com"
					rel="noopener noreferrer"
					target="_blank"
				>
					Markus Tacker
				</a>
				. All rights reserved.
			</p>
		</Copyright>
	</StyledFooter>
)
