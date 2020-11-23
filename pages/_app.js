import "styles/globals.scss";
import Head from "next/head";

console.log("执行了");

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
