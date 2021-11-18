import { useState } from 'react';
import DataSourceApi from '@/lib/DataSourceAPI.js';
import { formatPublishedDateForDisplay } from '@/utils/date.js';

const FilterTag = ({ text, toggleActive }) => (
    <li
        onClick={() => toggleActive(text)}
        className="bg-gray-200 text-hci-lila px-4 py-1 mb-2 mr-2 rounded-sm hover:bg-pink-500 cursor-pointer hover:text-white whitespace-nowrap"
    >
        {text}
    </li>
);

const Tag = ({ text }) => (
    <li className="bg-hci-lila text-white px-4 py-1 mb-2 mr-2 rounded-sm group-hover:bg-pink-500 whitespace-nowrap">
        {text}
    </li>
);

const PostListItem = ({ post }) => (
    <li key={post.sys.id}>
        <article className="group my-12 max-w-prose cursor-pointer">
            <p className="text-gray-400">
                {formatPublishedDateForDisplay(post.date)}
            </p>
            <h2 className="capitalize text-2xl font-roboto-condensed font-bold text-hci-lila leading-loose group-hover:text-pink-500">
                {post.title}
            </h2>
            <p className="text-gray-400">{post.author.fullName}</p>
            <p className="my-4 text-gray-700">{post.excerpt}</p>
            <ul className="flex">
                {post.tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                ))}
            </ul>
        </article>
    </li>
);

const BlogPostList = ({ posts, tags }) => {
    const [activeTags, setActiveTags] = useState([]);
    const toggleActive = (text) =>
        setActiveTags((activeTags) => [...activeTags, text]);
    console.log({ activeTags });

    return (
        <section className="sm:py-12 sm:bg-gray-50">
            <main className="max-w-4xl flex flex-col mx-auto my-8">
                <h2 className="capitalize text-3xl sm:text-4xl font-roboto-condensed font-bold text-gray-700 px-10 lg:px-0">
                    Blog Posts
                </h2>
                <div className="px-10 mt-8 max-w-prose lg:px-0">
                    <p className="text-gray-700 mb-2">Filter by tag</p>
                    <ul className="flex flex-wrap">
                        {tags.map((tag) => (
                            <FilterTag
                                key={tag}
                                text={tag}
                                toggleActive={toggleActive}
                            />
                        ))}
                    </ul>
                </div>
                <ol className="px-10 lg:px-0">
                    {posts.map((post) => {
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
    const posts = await DataSourceApi.getPosts({ preview: true });

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
