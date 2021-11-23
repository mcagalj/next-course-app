import DataSourceApi from '@/lib/DataSourceAPI.js';
import { NextSeo } from 'next-seo';
import SEO from '@/data/next-seo.config.js';

const Contact = () => {
    return (
        <>
            <NextSeo title={`${SEO.title} - Contact`} />
            <section className="sm:py-12 sm:bg-gray-50">
                <main className="max-w-4xl flex flex-col mx-auto my-8">
                    <h2 className="capitalize text-3xl sm:text-4xl font-roboto-condensed font-bold text-gray-700 px-10 sm:px-0">
                        Contact
                    </h2>
                </main>
            </section>
        </>
    );
};

export default Contact;

export async function getStaticProps() {
    const header = await DataSourceApi.getHeader();

    return {
        props: {
            header,
        },
    };
}
