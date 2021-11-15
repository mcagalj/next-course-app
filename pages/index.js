import Header from '@/modules/header/header.js';
import Cta from '@/modules/cta/cta.js';
import Testimonials from '@/modules/testimonials/testimonials.js';
import Footer from '@/modules/footer';

import DataSourceApi from '@/lib/DataSourceAPI.js';

const Home = ({ header, testimonials }) => {
    return (
        <>
            <Header data={header} />
            <Cta />
            <Testimonials testimonials={testimonials} />
            <Footer />
        </>
    );
};

export default Home;

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
