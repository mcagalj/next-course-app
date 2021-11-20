import Link from 'next/link';
import slugify from 'slugify';
import { useRouter } from 'next/router';

const NavBar = ({ classes, menuItems }) => {
    const router = useRouter();
    const isActive = (pathname) =>
        router.pathname.split('/')[1] === pathname.split('/')[1];
    return (
        <nav
            className={`${
                classes ? 'block' : 'hidden'
            } sm:inline-flex font-medium text-hci-lila ${classes}`}
        >
            {menuItems.map((item, index) => {
                const menuItemPath = index
                    ? `/${slugify(item, { lower: true })}`
                    : '/';
                return (
                    <Link key={item} href={menuItemPath} passHref>
                        <a
                            className={`px-5 py-2 whitespace-nowrap w-min hover:bg-hci-lila-dark ${
                                isActive(menuItemPath)
                                    ? 'bg-hci-lila text-white'
                                    : ''
                            } hover:text-white cursor-pointer`}
                        >
                            {item}
                        </a>
                    </Link>
                );
            })}
        </nav>
    );
};

export default NavBar;
