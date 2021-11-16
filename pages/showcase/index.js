import Testimonials from '@/modules/testimonials/testimonials.js';
import DataSourceApi from '@/lib/DataSourceAPI.js';

const ShowcaseIndexPage = ({ testimonials }) => (
    <Testimonials testimonials={testimonials} />
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
