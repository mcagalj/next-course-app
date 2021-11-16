import DataSourceApi from '@/lib/DataSourceAPI.js';

const Blog = () => {
    return (
        <section className="sm:py-12 sm:bg-gray-50">
            <main className="max-w-4xl flex flex-col mx-auto my-8">
                <h2 className="capitalize text-3xl sm:text-4xl font-roboto-condensed font-bold text-gray-700 px-10 sm:px-0">
                    Blog
                </h2>
            </main>
        </section>
    );
};

export default Blog;

export async function getStaticProps() {
    const header = await DataSourceApi.getHeader();

    return {
        props: {
            header,
        },
    };
}
