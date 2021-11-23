import Image from 'next/image';
import { serialize } from 'next-mdx-remote/serialize';
import remarkUnwrapImages from 'remark-unwrap-images';
import { MDXRemote } from 'next-mdx-remote';
import DataSourceApi from '@/lib/DataSourceAPI.js';
import loader from '@/utils/remoteImageLoader.js';
import { H2 } from '@/components/blog/heading.js';
import { P } from '@/components/blog/text.js';
import { Ul, Li } from '@/components/blog/list.js';
import { Pre, Code } from '@/components/blog/code.js';
import { Quote } from '@/components/blog/quote.js';
import { Tag } from '@/components/blog/tags.js';
import { Date } from '@/components/blog/date.js';
import { ResponsiveImage } from '@/components/blog/image.js';
import { NextSeo } from 'next-seo';
import SEO from '@/data/next-seo.config.js';

const components = {
    h2: H2,
    p: P,
    ul: Ul,
    li: Li,
    pre: Pre,
    code: Code,
    inlineCode: Code,
    blockquote: Quote,
    img: ResponsiveImage,
};

const BlogPost = ({ post }) => {
    return (
        <>
            <NextSeo title={`Blog - ${post.title}`} />
            <section>
                <article className="flex flex-col mx-auto mb-8 sm:mt-8 sm:mb-12 max-w-prose text-gray-700 px-5 lg:px-0">
                    <h1 className="mt-8 mb-1 text-3xl sm:text-4xl font-roboto-condensed font-semibold text-gray-700">
                        {post.title}
                    </h1>
                    <Date date={post.date} />
                    <ul className="flex mt-1 flex-wrap">
                        {post.tags.sort().map((tag) => (
                            <Tag key={tag} text={tag} />
                        ))}
                    </ul>
                    <div className="block relative mt-4 h-full w-full">
                        <Image
                            loader={loader}
                            src={post.heroImage.url}
                            layout="responsive"
                            width={4}
                            height={3}
                            alt={post.heroImage.title}
                        />
                    </div>
                    <MDXRemote {...post.mdxSource} components={components} lazy />
                </article>
            </section>
        </>
    );
};

export default BlogPost;

export async function getStaticProps({ params }) {
    const header = await DataSourceApi.getHeader();
    const post = await DataSourceApi.getPost({ slug: params.slug });

    post.mdxSource = await serialize(post.content, {
        mdxOptions: { remarkPlugins: [remarkUnwrapImages] },
    });
    delete post.content;

    return {
        props: {
            header,
            post,
        },
    };
}

export async function getStaticPaths() {
    const slugs = await DataSourceApi.getSlugs();

    const paths = slugs.map((slug) => ({
        params: {
            slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}
