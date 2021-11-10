import Link from 'next/link';
import slugify from 'slugify';
import { navigationItems } from '../const/navbarList';

const NavBar = ({ classes }) => {
    return (
        <nav
            className={`${
                classes ? 'block' : 'hidden'
            } sm:inline-flex list-none font-medium text-hci-lila ${classes}`}
        >
            {navigationItems.map((item) => (
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
