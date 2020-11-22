import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1 className={styles.title}> <span>查看第一篇文章</span> </h1>
        <Link href='/post/first-post'>
            <a >点击这里</a>
        </Link>
       <style jsx>{`
            h1{
                font-size:24px;
            }
        `}</style>
    </div>
  )
}
