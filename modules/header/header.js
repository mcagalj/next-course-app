import styles from './header.module.css';
import Image from 'next/image';

import LogoImg from '../../assets/logo.png';

const Header = () => {
    return (
        <header className={styles.main}>
            <main className={styles.content}>
                <Image src={LogoImg} width={50} height={50} alt="Logo image" />
                <nav>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Showcase</li>
                    <li>Blog</li>
                    <li>Contact Us</li>
                    <li>Sign In</li>
                </nav>
            </main>
        </header>
    );
};

export default Header;
