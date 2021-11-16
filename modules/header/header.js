/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavBar from '@/components/navbar';
import BurgerNavigation from '@/components/burgerNavigation';

const Header = ({ data }) => {
    const { logoSrc, heroSrc, menuItems, title, subtitle } = data;
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        if (isClicked) {
            body.classList.add('overflow-hidden');
        } else {
            body.classList.remove('overflow-hidden');
        }
    }, [isClicked]);

    return (
        <header className="px-5 py-5 relative flex items-center bg-hci-header sm:bg-transparent sm:h-80">
            <Image
                className="hidden sm:block z--1"
                src={heroSrc}
                layout="fill"
                objectFit="cover"
                // placeholder="blur"
                alt="Hero image"
            />

            <main className="max-w-4xl mx-auto flex-grow flex flex-col">
                <div className="z-10 flex justify-between items-center sm:mb-16">
                    <Image
                        src={logoSrc}
                        layout="fixed"
                        width={50}
                        height={50}
                        alt="Design logo"
                    />
                    <div className="flex items-center sm:hidden">
                        <BurgerNavigation
                            menuItems={menuItems}
                            isOpen={isClicked}
                            setIsOpen={setIsClicked}
                        />
                        <img
                            className="cursor-pointer z-0 h-5"
                            src={'/magnifier.svg'}
                            alt="Menu"
                        />
                        <div className="w-8" />
                        <img
                            onClick={() => setIsClicked(!isClicked)}
                            className={`h-7 transform scale-75 cursor-pointer z-50 transition-all ease-linear duration-500 ${
                                isClicked ? 'transform rotate-90' : ''
                            }`}
                            src={'/hamburger.svg'}
                            alt="Menu"
                        />
                    </div>
                    <NavBar menuItems={menuItems} />
                </div>
                <div className="hidden sm:block">
                    <h1 className="text-5xl font-roboto-condensed font-bold mb-2 text-hci-lila">
                        {title}
                    </h1>
                    <h3 className="text-3xl font-roboto-condensed font-light text-hci-lila text-opacity-60">
                        {subtitle}
                    </h3>
                </div>
            </main>
        </header>
    );
};

export default Header;
