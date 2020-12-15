import "styles/globals.scss";
import Head from "next/head";
import 'github-markdown-css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>刘圳槟的个人博客</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
