import Header from '@/modules/header/header.js';
import Testimonials from '@/modules/testimonials/testimonials.js';
import Footer from '@/modules/footer';

import DataSourceApi from '@/lib/DataSourceAPI.js';

const ShowcaseIndexPage = ({ header, testimonials }) => {
    console.log(header);
    return (
        <>
            <Header data={header} />
            <Testimonials testimonials={testimonials} />
            <Footer />
        </>
    );
};

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
