import Link from 'next/link';
import slugify from 'slugify';

const NavBar = ({ classes, menuItems }) => {
    return (
        <nav
            className={`${
                classes ? 'block' : 'hidden'
            } sm:inline-flex list-none font-medium text-hci-lila ${classes}`}
        >
            {menuItems.map((item) => (
                <Link
                    key={item}
                    href={`/${slugify(item, { lower: true })}`}
                    passHref
                >
                    <li className="px-5 py-2 whitespace-nowrap w-min hover:bg-hci-lila hover:bg-opacity-50 hover:text-white cursor-pointer">
                        {item}
                    </li>
                </Link>
            ))}
        </nav>
    );
};

export default NavBar;
