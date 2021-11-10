import { testimonials } from '@/const/testimonialsList';
import Airtable from 'airtable';
import { resolveHref } from 'next/dist/shared/lib/router/router';

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);

class DataSourceAPI {
    static getTestimonials() {
        const table = base('Testimonials');
        const testimonialsRecords = [];

        return new Promise((resolve, reject) => {
            table.select({}).eachPage(
                (records, fetchNextPage) => {
                    records.forEach((record) => {
                        const id = record.getId();
                        const caption = record.get('caption');
                        const imageSrc = record.get('imageSrc');
                        const content = record.get('content');

                        testimonialsRecords.push({
                            id,
                            caption,
                            imageSrc,
                            content,
                        });
                    });

                    fetchNextPage();
                },
                function done(err) {
                    if (err) reject(err);

                    return resolve(testimonialsRecords);
                }
            );
        });
    }
}

export default DataSourceAPI;
