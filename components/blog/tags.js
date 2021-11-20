const Tag = ({ text }) => (
    <li className="bg-hci-lila text-white text-sm px-2 py-0 mb-2 mr-2 rounded-sm group-hover:bg-pink-500 whitespace-nowrap">
        {text}
    </li>
);

const FilterTag = ({ text, active, toggleActive }) => (
    <li
        onClick={() => toggleActive(text)}
        className={`${
            active ? 'bg-hci-lila-dark text-white' : 'bg-gray-200 text-hci-lila'
        } px-4 py-1 mb-2 mr-2 rounded-sm hover:bg-pink-500 cursor-pointer hover:text-white whitespace-nowrap`}
    >
        {text}
    </li>
);

export { Tag, FilterTag };
