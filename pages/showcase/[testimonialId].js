import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '@/modules/header/header.js';
import Footer from '@/modules/footer';

import testimonials from '@/data/testimonials.json';

const Testimonial = () => {
    const router = useRouter();
    const { caption, imageSrc, content } = testimonials[router.query.testimonialId];

    return (
        <>
            <Header />
            <section className="sm:py-12 sm:bg-gray-50">
                <main className="max-w-4xl flex flex-col mx-auto">
                    <h2 className="capitalize text-3xl sm:text-4xl font-roboto-condensed font-bold text-gray-700">
                        {caption}
                    </h2>
                    <div className="flex justify-between mt-10">
                        <div className="relative w-1/2 h-96">
                            <Image
                                src={imageSrc}
                                layout="fill"
                                objectFit="cover"
                                alt="Grow business"
                            />
                        </div>
                        <p className="ml-8 leading-6 w-1/2">{content}</p>
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default Testimonial;
