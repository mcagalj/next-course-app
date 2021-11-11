import Header from '@/modules/header/header.js';
import Cta from '@/modules/cta/cta.js';
import Testimonials from '@/modules/testimonials/testimonials.js';
import Footer from '@/modules/footer';

import DataSourceApi from '@/lib/DataSourceAPI.js';

const Home = ({ testimonials }) => {
    return (
        <>
            <Header />
            <Cta />
            <Testimonials testimonials={testimonials} />
            <Footer />
        </>
    );
};

export default Home;

export async function getStaticProps() {
    const testimonials = await DataSourceApi.getTestimonials();

    return {
        props: {
            testimonials,
        },
    };
}
