import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import type { NextPage } from 'next'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Главная</title>
        <meta name="description" content="Главная страница" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.wrapper}>
        <h1>Home page</h1>
      </main>
    </>
  )
}
