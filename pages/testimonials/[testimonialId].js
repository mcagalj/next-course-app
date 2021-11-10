import { useRouter } from 'next/router';
import Header from '@/modules/header/header.js';
import Footer from '@/modules/footer';

const Testimonial = () => {
    const router = useRouter();

    return (
        <>
            <Header />
            <h1 className="text-2xl text-center p-20">
                HI! You are on{' '}
                <span className="text-red-700">{router.query.testimonialId}</span>
            </h1>
            <Footer />
        </>
    );
};

export default Testimonial;
