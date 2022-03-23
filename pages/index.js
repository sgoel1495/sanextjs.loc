import React, {Fragment, useContext, useEffect, useState} from 'react';
import PageHead from '../components/PageHead';
import AppWideContext from "../store/AppWideContext";
import SafetyBlock from "../components/safety-block/SafetyBlock";
import Navbar from "../components/navbar/Index";
import WhySalt from "../components/why-salt/WhySalt";
import AboutSaltHomepage from "../components/about-salt/AboutSaltHomepage";
import DesignBlock from "../components/design-block/DesignBlock";
import Footer from "../components/footer/Footer";
import HomePageHeaderSwiper from "../components/swipers/HomePageHeaderSwiper";
import NewArrivalsSwiper from "../components/swipers/NewArrivalsSwiper";
import MediaBuzzSwiper from "../components/swipers/MediaBuzzSwiper";
import ShopByLooksSwiper from "../components/swipers/ShopByLooksSwiper";
import InstagramStoriesSwiper from "../components/swipers/InstagramStoriesSwiper";
import CategorySection from "../components/category-section/categorySection";


/**
 * @todo assign mobile view and browser view
 * @returns {JSX.Element}
 * @constructor
 */

function RootPage() {
    const {dataStore} = useContext(AppWideContext);

    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const mobileView = <Fragment>
        <CategorySection/>
    </Fragment>;

    const browserView = <Fragment>
        <HomePageHeaderSwiper isMobile={dataStore.mobile}/>
        <SafetyBlock isMobile={dataStore.mobile}/>
        <NewArrivalsSwiper isMobile={dataStore.mobile}/>
        <WhySalt isMobile={dataStore.mobile}/>
        <AboutSaltHomepage isMobile={dataStore.mobile}/>
        <MediaBuzzSwiper isMobile={dataStore.mobile}/>
        <ShopByLooksSwiper isMobile={dataStore.mobile}/>
        <InstagramStoriesSwiper isMobile={dataStore.mobile}/>
        <DesignBlock isMobile={dataStore.mobile}/>
    </Fragment>;

    return (
        <Fragment>
            <PageHead url="/" id="home" isMobile={dataStore.mobile}/>
            <Navbar isMobile={dataStore.mobile} navControl={navControl}/>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}


export default RootPage;
