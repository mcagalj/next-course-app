import Header from '@/modules/header/header.js';
import Testimonials from '@/modules/testimonials/testimonials.js';
import Footer from '@/modules/footer';

import DataSourceApi from '@/lib/DataSourceAPI.js';

const ShowcaseIndexPage = ({ testimonials }) => {
    return (
        <>
            <Header />
            <Testimonials testimonials={testimonials} />
            <Footer />
        </>
    );
};

export default ShowcaseIndexPage;

export async function getStaticProps() {
    const testimonials = await DataSourceApi.getTestimonials();

    return {
        props: {
            testimonials,
        },
    };
}
