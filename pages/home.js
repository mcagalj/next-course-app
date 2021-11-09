import Header from '@/modules/header/header.js';
import Cta from '@/modules/cta/cta.js';
import Testimonials from '@/modules/testimonials/testimonials.js';
import Footer from '@/modules/footer';

const Hello = () => {
    return (
        <>
            <Header />
            <Cta />
            <Testimonials />
            <Footer />
        </>
    );
};

export default Hello;
