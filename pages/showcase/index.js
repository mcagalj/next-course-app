import Testimonials from '@/modules/testimonials/testimonials.js';
import DataSourceApi from '@/lib/DataSourceAPI.js';
import { NextSeo } from 'next-seo';
import SEO from '@/data/next-seo.config.js';

const ShowcaseIndexPage = ({ testimonials }) => (
    <>
        <NextSeo title={`${SEO.title} - Showcase`} />
        <Testimonials testimonials={testimonials} />
    </>
);

export default ShowcaseIndexPage;

export async function getStaticProps() {
    const header = await DataSourceApi.getHeader();
    const testimonials = await DataSourceApi.getTestimonials();

    return {
        props: {
            header,
            testimonials,
        },
    };
}
