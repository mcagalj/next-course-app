import DataSourceApi from '@/lib/DataSourceAPI.js';

const BlogPost = ({ post }) => {
    return <h1>{post.title}</h1>;
};

export default BlogPost;

export async function getStaticProps({ params }) {
    // const header = await DataSourceApi.getHeader();
    const post = await DataSourceApi.getPost({ slug: params.slug });

    return {
        props: {
            // header,
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
