import Image from 'next/image';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import DataSourceApi from '@/lib/DataSourceAPI.js';

import { H2 } from '@/components/blog/heading.js';
import { P } from '@/components/blog/text.js';
import { Ul, Li } from '@/components/blog/list.js';
import { Pre, Code } from '@/components/blog/code.js';

const components = {
    h2: H2,
    p: P,
    ul: Ul,
    li: Li,
    pre: Pre,
    code: Code,
    inlineCode: Code,
};

const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 65}`;
};

const BlogPost = ({ post }) => {
    return (
        <section>
            <article className="max-w-4xl flex flex-col mx-auto my-8 text-gray-700 px-10 lg:px-0">
                <h1 className="capitalize my-8 text-3xl sm:text-4xl font-roboto-condensed font-semibold text-hci-lila">
                    {post.title}
                </h1>
                <div className="flex relative h-40 sm:h-80 w-full">
                    <Image
                        loader={imageLoader}
                        src={post.heroImage.url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="0px center"
                        alt="Grow business"
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
