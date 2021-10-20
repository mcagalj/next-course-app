import React from 'react';
import styles from './header.module.css';
import Image from 'next/image';

import LogoImg from '../../assets/logo.png';
import HeroImg from '../../assets/hero.png';

const Header = () => {
    return (
        <header className={styles.main}>
            <div className={styles.bgWrap}>
                <Image
                    src={HeroImg}
                    layout="fill"
                    objectFit="cover"
                    alt="Hero image"
                />
            </div>
            <main className={styles.content}>
                <div className={styles.menuWrap}>
                    <Image
                        src={LogoImg}
                        layout="fixed"
                        width={50}
                        height={50}
                        alt="Design logo"
                    />

                    <nav>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Showcase</li>
                        <li>Blog</li>
                        <li>Contact</li>
                        <li>Sign In</li>
                    </nav>
                </div>
                <h1>Design Matters</h1>
                <h3>Entrust us with your digital appearance</h3>
            </main>
        </header>
    );
};

export default Header;
