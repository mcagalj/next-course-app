// Indeed, it is strange that we import module
// from a component ... so we may reconsider
// the overall folder structure :-)
import Header from '@/modules/header/header';
import Footer from '@/modules/footer';

const Layout = ({ children, header, footer }) => {
    return (
        <>
            <Header data={header} />
            {children}
            <Footer data={footer} />
        </>
    );
};

export default Layout;
