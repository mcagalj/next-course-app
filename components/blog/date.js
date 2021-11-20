import { formatPublishedDateForDisplay } from '@/utils/date.js';

const Date = ({ date }) => (
    <p className="text-gray-400">{formatPublishedDateForDisplay(date)}</p>
);

export { Date };
