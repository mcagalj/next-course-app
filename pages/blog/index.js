import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import loader from '@/utils/remoteImageLoader.js';
import DataSourceApi from '@/lib/DataSourceAPI.js';
import { Tag, FilterTag } from '@/components/blog/tags.js';
import { Date } from '@/components/blog/date.js';
import { NextSeo } from 'next-seo';
import SEO from '@/data/next-seo.config.js';

const PostListItem = ({ post }) => (
    // eslint-disable-next-line @next/next/link-passhref
    <Link href={`/blog/${post.slug}`}>
        <li key={post.sys.id}>
            <article className="group mt-8 mb-14 lg:mb-16 cursor-pointer sm:flex items-end">
                <div className="flex mb-2 relative h-60 w-full sm:hidden">
                    <Image
                        loader={loader}
                        src={post.heroImage.url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center center"
                        alt={post.heroImage.title}
                    />
                </div>
                <div className="hidden sm:block relative h-32 sm:w-2/5 sm:h-60">
                    <Image
                        loader={loader}
                        src={post.heroImage.url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center center"
                        alt={post.heroImage.title}
                    />
                </div>
                <div className="flex flex-col justify-between sm:ml-4 lg:ml-8 sm:h-60 sm:w-3/5 sm:max-w-prose">
                    <Date date={post.date} />
                    <h2 className="text-2xl font-roboto-condensed font-bold text-hci-lila leading-loose group-hover:text-pink-500">
                        {post.title}
                    </h2>
                    <p className="text-gray-400">{post.author.fullName}</p>
                    <p className="mt-4 text-gray-700">{post.excerpt}</p>
                    <ul className="flex flex-wrap">
                        {post.tags.sort().map((tag) => (
                            <Tag key={tag} text={tag} className="mb-0" />
                        ))}
                    </ul>
                </div>
            </article>
        </li>
    </Link>
);

const BlogPostList = ({ posts, tags }) => {
    const [activeTags, setActiveTags] = useState([]);

    const toggleActive = (text) =>
        setActiveTags((activeTags) => {
            if (activeTags.includes(text)) {
                return activeTags.filter((tag) => tag !== text);
            }
            return [...activeTags, text];
        });

    // This is an example of a bad code (it works but is hard to comprehend - bad design)
    const filteredPosts = !activeTags.length
        ? posts
        : posts.filter(
              (post) => !!post.tags.filter((tag) => activeTags.includes(tag)).length
          );

    return (
        <>
            <NextSeo title={`${SEO.title} - Blog`} />
            <section>
                <main className="max-w-4xl px-5 flex flex-col mx-auto my-8">
                    <h2 className="capitalize sm:my-8 text-3xl sm:text-4xl font-roboto-condensed font-bold text-gray-700 lg:px-0">
                        Blog Posts
                    </h2>
                    <div className="sm:mt-0 lg:px-0">
                        <p
                            onClick={() => setActiveTags([])}
                            className={`text-gray-700 mb-1 pt-4 pb-2 sm:mb-2 sm:py-4 uppercase text-xl font-roboto-condensed cursor-pointer ${
                                activeTags.length ? 'hover:text-hci-lila-dark' : ''
                            }`}
                        >
                            {activeTags.length
                                ? 'Reset filters \u2002 \u2715'
                                : 'Filter by tag'}
                        </p>
                        <ul className="flex overflow-x-auto sm:flex-wrap sm:overflow-x-hidden">
                            {tags.sort().map((tag) => (
                                <FilterTag
                                    key={tag}
                                    text={tag}
                                    active={activeTags.includes(tag)}
                                    toggleActive={toggleActive}
                                />
                            ))}
                        </ul>
                    </div>
                    <ol className="lg:px-0">
                        {filteredPosts.map((post) => {
                            return <PostListItem key={post.sys.id} post={post} />;
                        })}
                    </ol>
                </main>
            </section>
        </>
    );
};

export default BlogPostList;

export async function getStaticProps() {
    const header = await DataSourceApi.getHeader();
    const posts = await DataSourceApi.getPosts();

    // TBD: try to get this from the CMS
    const unionOfTags = posts.reduce((tags, post) => {
        return [...tags, ...post.tags];
    }, []);
    const tags = Array.from(new Set(unionOfTags));

    return {
        props: {
            header,
            posts,
            tags,
        },
    };
}
