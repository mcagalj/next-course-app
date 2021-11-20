import Image from 'next/image';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import DataSourceApi from '@/lib/DataSourceAPI.js';
import loader from '@/utils/remoteImageLoader.js';
import { H2 } from '@/components/blog/heading.js';
import { P } from '@/components/blog/text.js';
import { Ul, Li } from '@/components/blog/list.js';
import { Pre, Code } from '@/components/blog/code.js';
import { Tag } from '@/components/blog/tags.js';
import { Date } from '@/components/blog/date.js';

const components = {
    h2: H2,
    p: P,
    ul: Ul,
    li: Li,
    pre: Pre,
    code: Code,
    inlineCode: Code,
};

const BlogPost = ({ post }) => {
    return (
        <section>
            <article className="flex flex-col mx-auto mb-8 sm:mt-8 sm:mb-12 max-w-prose text-gray-700 px-10 lg:px-0">
                <h1 className="mt-8 mb-1 text-3xl sm:text-4xl font-roboto-condensed font-semibold text-gray-700">
                    {post.title}
                </h1>
                <Date date={post.date} />
                <ul className="flex mt-1 flex-wrap">
                    {post.tags.sort().map((tag) => (
                        <Tag key={tag} text={tag} />
                    ))}
                </ul>
                <div className="flex relative mt-4 h-40 sm:h-60 w-full">
                    <Image
                        loader={loader}
                        src={post.heroImage.url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center center"
                        alt={post.heroImage.title}
                    />
                </div>
                <MDXRemote {...post.mdxSource} components={components} />
            </article>
        </section>
    );
};

export default BlogPost;

export async function getStaticProps({ params }) {
    const header = await DataSourceApi.getHeader();
    const post = await DataSourceApi.getPost({ slug: params.slug });

    post.mdxSource = await serialize(post.content);
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
