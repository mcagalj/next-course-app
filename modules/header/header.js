import Image from 'next/image';

import LogoImg from '../../assets/logo.png';
import HeroImg from '../../assets/hero.png';
import NavBar from '../../components/navbar';

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
                    <NavBar />
                </div>
                <div className="z-10">
                    <h1 className="text-5xl font-roboto-condensed font-bold mb-2 text-hci-lila">
                        Design Matters
                    </h1>
                    <h3 className="text-3xl font-roboto-condensed font-light text-hci-lila text-opacity-60">
                        Entrust us with your digital appearance
                    </h3>
                </div>
            </main>
        </header>
    );
};

export default Header;
