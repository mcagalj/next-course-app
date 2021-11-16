import Cta from '@/modules/cta/cta.js';
import Testimonials from '@/modules/testimonials/testimonials.js';
import DataSourceApi from '@/lib/DataSourceAPI.js';

const Home = ({ testimonials }) => {
    return (
        <>
            <Cta />
            <Testimonials testimonials={testimonials} />
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
