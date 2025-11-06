import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Main App - Hello World</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Hello World! 👋</h1>
        <p className={styles.description}>Your Next.js app is running successfully</p>
        <div className={styles.portInfo}>
          Running on Port 5000
        </div>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Main App (Port 5000)
          </Link>
          <Link href="/markdown-preview" className={styles.link}>
            Markdown Preview
          </Link>
        </div>
      </div>
    </>
  )
}
