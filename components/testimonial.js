import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';

const Testimonial = ({ caption, imageUrl }) => (
    <div className="h-96 sm:border hover:cursor-pointer first:mt-0">
        <div className="h-4/5 bg-gray-100 relative">
            <Image
                src={imageUrl}
                layout="fill"
                objectFit="cover"
                objectPosition="0px 0px"
                alt={caption}
            />
        </div>
        <Link
            href={{
                pathname: `/showcase/[testimonialId]`,
                query: { testimonialId: slugify(caption, { lower: true }) },
            }}
            passHref
        >
            <div className="flex px-10 items-center relative mt-8 sm:hidden">
                <p className="uppercase sm:text-xl font-semibold text-hci-lila">
                    {caption}
                </p>

                <div className="absolute right-10 h-full flex items-center">
                    <img src={'/right.svg'} className="w-3 h-3" alt="Right icon" />
                    {/* <Image
                        src={right}
                        layout="fixed"
                        width={15}
                        height={15}
                        alt="Right icon"
                    /> */}
                </div>
            </div>
        </Link>

        <Link
            href={{
                pathname: `/showcase/[testimonialId]`,
                query: { testimonialId: slugify(caption, { lower: true }) },
            }}
            passHref
        >
            <div className="h-1/5 bg-gray-300 items-center justify-center cursor-pointer relative hidden sm:flex">
                <p className="capitalize font-roboto-condensed text-xl text-hci-lila">
                    {caption}
                </p>
                <div className="absolute right-4 h-full flex items-center">
                    <img src={'/right.svg'} className="w-3 h-3" alt="Right icon" />
                    {/* <Image
                        src={right}
                        layout="fixed"
                        width={15}
                        height={15}
                        alt="Right icon"
                    /> */}
                </div>
            </div>
        </Link>
    </div>
);

export default Testimonial;
