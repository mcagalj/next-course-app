import { useRouter } from 'next/router';
import Header from '@/modules/header/header.js';
import Footer from '@/modules/footer';

const Testimonial = () => {
    const router = useRouter();

    return (
        <>
            <Header />
            <h1 className="text-2xl">HI! You are on {router.query.testimonialId}</h1>
            <Footer />
        </>
    );
};

export default Testimonial;
