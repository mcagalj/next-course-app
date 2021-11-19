import Airtable from 'airtable';
import { GraphQLClient, gql } from 'graphql-request';

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE);

const graphQLClient = new GraphQLClient(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`
);

class DataSourceAPI {
    // --- START Airtable ---
    static async getTestimonials() {
        const table = base('Testimonials');

        const records = await table
            .select({ filterByFormula: "NOT({publish} = 'false')" })
            .all();

        return records.map((record) => {
            const { id, fields } = record;
            return { id, fields };
        });
    }

    static async getTestimonialById(id) {
        const table = base('Testimonials');
        const record = await table.find(id);
        return {
            id: record.id,
            fields: record.fields,
        };
    }

    static async getHeader() {
        const table = base('Header');
        const fields = ['logoSrc', 'heroSrc', 'menuItems', 'title', 'subtitle'];

        const records = await table
            .select({
                fields,
                maxRecords: 1,
            })
            .firstPage();
        const { logoSrc, heroSrc, menuItems, title, subtitle } = records[0].fields;
        return {
            logoSrc: logoSrc[0],
            heroSrc: heroSrc[0],
            menuItems,
            title,
            subtitle,
        };
    }
    // --- END Airtable ---

    // --- START Contentful ---
    static queryContentful(query, variables = {}) {
        const requestHeaders = {
            Authorization: `Bearer ${
                variables?.preview
                    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                    : process.env.CONTENTFUL_ACCESS_TOKEN
            }`,
        };

        try {
            return graphQLClient.request(query, variables, requestHeaders);
        } catch (error) {
            throw new Error('Could not fetch data from Contentful!');
        }
    }

    static async getPosts({ preview = false } = {}) {
        const query = gql`
            query getPosts($preview: Boolean!) {
                blogPostCollection(preview: $preview, order: date_DESC) {
                    posts: items {
                        sys {
                            id
                        }
                        title
                        slug
                        heroImage {
                            url
                        }
                        date
                        author {
                            fullName
                        }
                        excerpt
                        content
                        tags
                    }
                }
            }
        `;

        const variables = { preview };
        const response = await this.queryContentful(query, variables);
        const { posts } = response?.blogPostCollection;

        return posts;
    }

    static async getPost({ slug, preview = false } = {}) {
        const query = gql`
            query getPost($slug: String!, $preview: Boolean!) {
                blogPostCollection(
                    preview: $preview
                    where: { slug: $slug }
                    order: date_DESC
                ) {
                    posts: items {
                        title
                        slug
                        heroImage {
                            url
                        }
                        date
                        author {
                            fullName
                        }
                        content
                        tags
                    }
                }
            }
        `;

        const variables = { slug, preview };
        const response = await this.queryContentful(query, variables);
        const post = response?.blogPostCollection?.posts?.pop();

        return post;
    }

    static async getSlugs({ preview = false } = {}) {
        const query = gql`
            query getSlugs($preview: Boolean!) {
                blogPostCollection(preview: $preview) {
                    posts: items {
                        slug
                    }
                }
            }
        `;

        const variables = { preview };
        const response = await this.queryContentful(query, variables);
        const { posts } = response?.blogPostCollection;
        const slugs = posts.map((post) => post.slug);

        return slugs;
    }
    // --- END Contentful ---
}

export default DataSourceAPI;
