import "styles/globals.scss";
import Head from "next/head";
import 'github-markdown-css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>next app</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
