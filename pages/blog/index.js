import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import loader from '@/utils/remoteImageLoader.js';
import DataSourceApi from '@/lib/DataSourceAPI.js';
import { Tag, FilterTag } from '@/components/blog/tags.js';
import { Date } from '@/components/blog/date.js';

const PostListItem = ({ post }) => (
    // eslint-disable-next-line @next/next/link-passhref
    <Link href={`/blog/${post.slug}`}>
        <li key={post.sys.id}>
            <article className="group my-14 cursor-pointer sm:flex items-end">
                <div className="flex relative sm:border sm:border-gray-200 my-2 h-32 sm:w-1/3 sm:h-60">
                    <Image
                        loader={loader}
                        src={post.heroImage.url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center end"
                        alt={post.heroImage.title}
                    />
                </div>
                <div className="sm:ml-4 sm:w-2/3 sm:max-w-prose">
                    <Date date={post.date} />
                    <h2 className="text-2xl font-roboto-condensed font-bold text-hci-lila leading-loose group-hover:text-pink-500">
                        {post.title}
                    </h2>
                    <p className="text-gray-400">{post.author.fullName}</p>
                    <p className="my-4 text-gray-700">{post.excerpt}</p>
                    <ul className="flex flex-wrap">
                        {post.tags.sort().map((tag) => (
                            <Tag key={tag} text={tag} />
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
        <section>
            <main className="max-w-4xl flex flex-col mx-auto my-8">
                <h2 className="capitalize sm:my-8 text-3xl sm:text-4xl font-roboto-condensed font-bold text-gray-700 px-10 lg:px-0">
                    Blog Posts
                </h2>
                <div className="px-10 sm:mt-0  lg:px-0">
                    <p
                        onClick={() => setActiveTags([])}
                        className={`text-gray-700 mb-2 py-4 uppercase text-xl font-roboto-condensed cursor-pointer ${
                            activeTags.length ? 'hover:text-hci-lila-dark' : ''
                        }`}
                    >
                        {activeTags.length
                            ? 'Reset filters \u2002 \u2715'
                            : 'Filter by tag'}
                    </p>
                    <ul className="flex flex-wrap">
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
                <ol className="px-10 lg:px-0">
                    {filteredPosts.map((post) => {
                        return <PostListItem key={post.sys.id} post={post} />;
                    })}
                </ol>
            </main>
        </section>
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
