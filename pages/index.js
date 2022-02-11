import React, {Fragment, useContext} from 'react';
import PageHead from '../components/PageHead';
import AppWideContext from "../store/AppWideContext";
import InfoBand from "../components/info-band/InfoBand";
import SafetyBlock from "../components/safety-block/SafetyBlock";
import Navbar from "../components/navbar/Navbar";
import WhySalt from "../components/why-salt/WhySalt";
import AboutSaltHomepage from "../components/about-salt/AboutSaltHomepage";
import DesignBlock from "../components/design-block/DesignBlock";
import Footer from "../components/footer/Footer";
import HomePageHeaderSwiper from "../components/swipers/HomePageHeaderSwiper";
import NewArrivalsSwiper from "../components/swipers/NewArrivalsSwiper";
import MediaBuzzSwiper from "../components/swipers/MediaBuzzSwiper";
import ShopByLooksSwiper from "../components/swipers/ShopByLooksSwiper";
import InstagramStoriesSwiper from "../components/swipers/InstagramStoriesSwiper";

/**
 * @todo assign mobile view and browser view
 * @returns {JSX.Element}
 * @constructor
 */

function RootPage() {
    const {dataStore} = useContext(AppWideContext);

    const [navControl, setNavControl] = React.useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const mobileView = null;
    const browserView = null;

    return (
        <Fragment>
            <PageHead url="/" id="home" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white' : ' bg-white/60']}>
                <InfoBand/>
                <Navbar isMobile={dataStore.mobile}/>
            </div>
            <HomePageHeaderSwiper isMobile={dataStore.mobile}/>
            <SafetyBlock isMobile={dataStore.mobile}/>
            <NewArrivalsSwiper isMobile={dataStore.mobile}/>
            <WhySalt isMobile={dataStore.mobile}/>
            <AboutSaltHomepage isMobile={dataStore.mobile}/>
            <MediaBuzzSwiper isMobile={dataStore.mobile}/>
            <ShopByLooksSwiper isMobile={dataStore.mobile}/>
            <InstagramStoriesSwiper isMobile={dataStore.mobile}/>
            <DesignBlock isMobile={dataStore.mobile}/>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}


export default RootPage;
