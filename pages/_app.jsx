import Head from "next/head";
import { Lato } from 'next/font/google';
import { CSSReset } from "../src/CSSReset";

// import IconTab from "../public/assets/icon-logo.svg"

const roboto = Lato({
    subsets: ['latin'],
    weight: ['400', '700']
})

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Calendário - Bora Codar 17 </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="shortcut icon" href="/assets/logo.svg" type="image/x-icon"/> */}
            </Head>
            <main className={roboto.className}>
                <CSSReset />
                <Component {...pageProps} />
            </main>
        </>
    )
}
