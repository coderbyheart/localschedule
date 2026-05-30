import { GithubIcon } from './FeatherIcons.tsx'
import styles from './Footer.module.css'

const homepage = import.meta.env.PUBLIC_HOMEPAGE

export const Footer = () => (
	<footer className={styles.Footer}>
		<section className={styles.Copyright}>
			<nav className={styles.Nav}>
				<a
					href={homepage}
					rel="noopener noreferrer"
					target="_blank"
					title={'Contribute to this project on GitHub'}
				>
					<GithubIcon />
				</a>
			</nav>
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
		</section>
	</footer>
)
