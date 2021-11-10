import { useRouter } from 'next/router';
import slugify from 'slugify';
import Image from 'next/image';
import Header from '@/modules/header/header.js';
import Footer from '@/modules/footer';

// import testimonials from '@/data/testimonials.json';
import DataSourceApi from '@/utils/DataSourceAPI.js';

const Testimonial = ({ testimonial }) => {
    const { caption, imageSrc, content } = testimonial;

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

export async function getStaticPaths() {
    const testimonials = await DataSourceApi.getTestimonials();

    const paths = testimonials.map((testimonial) => ({
        params: {
            testimonialId: slugify(testimonial.caption, {
                lower: true,
            }),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    console.log({ params });
    // This is suboptimal (calling the same API for the same data twice);
    // we could potentially cache data in production.
    const testimonials = await DataSourceApi.getTestimonials();

    const testimonial = testimonials.find(
        (testimonial) =>
            slugify(testimonial.caption, { lower: true }) === params.testimonialId
    );

    return {
        props: {
            testimonial,
        },
    };
}
