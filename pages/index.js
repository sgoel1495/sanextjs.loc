import React, {Fragment, useContext, useEffect, useState} from 'react';
import PageHead from '../components/PageHead';
import AppWideContext from "../store/AppWideContext";
import SafetyBlock from "../components/safety-block/SafetyBlock";
import Header from "../components/navbar/Header";
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
import NewArrivalsSection from "../components/new-Arrivals/Index"
import LooksSection from "../components/looks-section/Index"
import Collections from "../components/collections/Index"
import Preferences from "../components/preference-section/Index";
import OurShop from "../components/our-shop/Index"
import AboutUs from '../components/about-us-section/Index'
import OurStores from '../components/our-stores/Index'
import Media from "../components/media/Index"
import Reviews from "../components/review-section/Index"

/**
 * @returns {JSX.Element}
 * @constructor
 */

function RootPage() {
    const {dataStore} = useContext(AppWideContext);

    const mobileView = <Fragment>
        <CategorySection/>
        <NewArrivalsSection/>
        <OurShop/>
        <LooksSection/>
        <Collections/>
        <Preferences/>
        <AboutUs/>
        <OurStores/>
        <Media/>
        <Reviews/>
    </Fragment>;

    const browserView = <Fragment>
        <HomePageHeaderSwiper isMobile={dataStore.mobile}/>
        <SafetyBlock isMobile={dataStore.mobile}/>
        <NewArrivalsSwiper isMobile={dataStore.mobile}/>
        <WhySalt isMobile={dataStore.mobile}/>
        <AboutSaltHomepage isMobile={dataStore.mobile}/>
        <MediaBuzzSwiper isMobile={dataStore.mobile}/>
        <ShopByLooksSwiper isMobile={dataStore.mobile}/>
        <InstagramStoriesSwiper isMobile={dataStore.mobile} apiToken={dataStore.apiToken}/>
        <DesignBlock isMobile={dataStore.mobile}/>
    </Fragment>;

    return (
        <Fragment>
            <PageHead url="/" id="home" isMobile={dataStore.mobile}/>

            {(dataStore.mobile) ?
                <>
                    <Header isMobile={true}/>
                    {mobileView}
                </> :
                <>
                    <Header isMobile={false}/>
                    {browserView}
                </>
            }
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}


export default RootPage;
