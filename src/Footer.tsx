import { GithubIcon } from 'app/FeatherIcons'
import styles from 'app/Footer.module.css'

export const Footer = () => (
	<footer className={styles.Footer}>
		<section className={styles.Copyright}>
			<nav className={styles.Nav}>
				<a
					href={import.meta.env.PUBLIC_HOMEPAGE}
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
