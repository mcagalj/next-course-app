import '../styles/globals.css';
import Layout from '@/components/layout';

function MyApp({ Component, pageProps }) {
    const { header, footer } = pageProps;
    return (
        <Layout header={header} footer={footer}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
