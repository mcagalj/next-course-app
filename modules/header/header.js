import React from 'react';
import Image from 'next/image';

import LogoImg from '../../assets/logo.png';
import HeroImg from '../../assets/hero.png';

const Header = () => {
    return (
        <header className="h-80 relative flex items-center">
            <Image
                src={HeroImg}
                className="z-0"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                alt="Hero image"
            />
            <main className="max-w-4xl mx-auto flex-grow flex flex-col">
                <div className="z-10 flex justify-between items-center mb-16">
                    <Image
                        src={LogoImg}
                        layout="fixed"
                        width={50}
                        height={50}
                        alt="Design logo"
                    />
                    <nav className="z-10">
                        <ul className="inline-flex list-none font-medium text-purple-900">
                            <li className="px-5 py-2 text-white bg-purple-900 hover:bg-purple-700 hover:cursor-pointer">
                                Home
                            </li>
                            <li className="px-5 py-2 hover:bg-purple-700 hover:text-white hover:cursor-pointer">
                                About Us
                            </li>
                            <li className="px-5 py-2 hover:bg-purple-700 hover:text-white hover:cursor-pointer">
                                Showcase
                            </li>
                            <li className="px-5 py-2 hover:bg-purple-700 hover:text-white hover:cursor-pointer">
                                Blog
                            </li>
                            <li className="px-5 py-2 hover:bg-purple-700 hover:text-white hover:cursor-pointer">
                                Contact
                            </li>
                            <li className="px-5 py-2 hover:bg-purple-700 hover:text-white hover:cursor-pointer">
                                Sign In
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="z-10">
                    <h1 className="text-5xl font-bold mb-2 text-purple-900">
                        Design Matters
                    </h1>
                    <h3 className="text-3xl text-purple-900 text-opacity-60">
                        Entrust us with your digital appearance
                    </h3>
                </div>
            </main>
        </header>
    );
};

export default Header;
