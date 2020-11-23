import Link from "next/link";
import Head from "next/head";

export default function FirstPost() {
    return (
        <div>
            <Head>
                <title>first post</title>
            </Head>
            <h1> hello first post</h1>
            <span>返回首页</span>
            <Link href='/'>
                <a>点击这里</a>
            </Link>

        </div>
    )
}