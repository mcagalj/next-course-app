import Airtable from 'airtable';

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);

class DataSourceAPI {
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
}

export default DataSourceAPI;
