import React, {Fragment, useContext} from 'react';
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
import {connect} from "react-redux";
import {fetchCategoryCircle, fetchHomePageSwiper} from "../helpers/fetchHomePageData";

/**
 * @returns {JSX.Element}
 * @constructor
 */

function RootPage({appConfig, homePageSwiper, categoryCircle}) {

    const mobileView = <Fragment>
        <CategorySection homePageSwiper={homePageSwiper.mob} categoryCircle={categoryCircle}/>
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
        <HomePageHeaderSwiper isMobile={false} {...homePageSwiper.web}/>
        <SafetyBlock isMobile={false}/>
        <NewArrivalsSwiper isMobile={false}/>
        <WhySalt isMobile={false}/>
        <AboutSaltHomepage isMobile={false}/>
        <MediaBuzzSwiper isMobile={false}/>
        <ShopByLooksSwiper isMobile={false}/>
        <InstagramStoriesSwiper isMobile={false} apiToken={appConfig.apiToken}/>
        <DesignBlock isMobile={false}/>
    </Fragment>;

    return (
        <Fragment>
            <PageHead url="/" id="home" isMobile={appConfig.isMobile}/>
            {(appConfig.isMobile) ?
                <>
                    <Header isMobile={true}/>
                    {mobileView}
                </> :
                <>
                    <Header isMobile={false}/>
                    {browserView}
                </>
            }
            <Footer isMobile={appConfig.isMobile}/>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(RootPage);


export async function getServerSideProps() {
    const homePageSwiper = await fetchHomePageSwiper();
    const categoryCircle = await fetchCategoryCircle();
    return {
        props: {
            homePageSwiper: {
                web:{
                    imgs: homePageSwiper.data.web.imgs,
                    links: homePageSwiper.data.web.links,
                    transition_time: homePageSwiper.data.web.transition_time
                },
                mob:{
                    imgs: homePageSwiper.data.mob.imgs,
                    links: homePageSwiper.data.mob.links,
                    transition_time: homePageSwiper.data.mob.transition_time
                }
            },
            categoryCircle: categoryCircle
        }, // will be passed to the page component as props
    }
}