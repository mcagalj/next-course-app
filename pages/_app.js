import Head from 'next/head';
import '../styles/globals.css';
import Layout from '@/components/layout';

function MyApp({ Component, pageProps }) {
    const { header, footer } = pageProps;
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.png" key="icon" />
            </Head>
            <Layout header={header} footer={footer}>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
