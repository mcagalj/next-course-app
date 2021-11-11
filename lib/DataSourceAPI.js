import Airtable from 'airtable';

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);

class DataSourceAPI {
    static async getTestimonials() {
        const table = base('Testimonials');

        const records = await table.select({}).all();
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
}

export default DataSourceAPI;
