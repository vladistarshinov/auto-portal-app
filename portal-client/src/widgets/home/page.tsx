import { FC } from 'react'
import Image from 'next/image'

import styles from "./Home.module.scss";
import Link from 'next/link';

const Home: FC = () => {

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>Welcome to Ilonsi shop!</h1>

				<p className={styles.description}>
					UI Kit is on{" "}
					<Link className={styles.title__link} href="/components-example">
						/components-example
					</Link>{" "}
					page
				</p>

				<p className={styles.description}>
					Redux example is on{" "}
					<Link className={styles.title__link} href="/redux-example">
						/redux-example
					</Link>{" "}
					page
				</p>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
				</a>
			</footer>
		</div>
	)
}

export default Home