import {Fragment, useContext} from 'react';
import PageHead from '../components/PageHead';
import AppWideContext from "../store/AppWideContext";
import InfoBand from "../components/info-band/InfoBand";
import SafetyBlock from "../components/safety-block/SafetyBlock";
import Navbar from "../components/navbar/Navbar";
import WhySalt from "../components/why-salt/WhySalt";
import AboutSalt from "../components/about-salt/AboutSalt";
import DesignBlock from "../components/design-block/DesignBlock";
import Footer from "../components/footer/Footer";
import HomePageHeaderSwiper from "../components/swipers/HomePageHeaderSwiper";
import NewArrivalsSwiper from "../components/swipers/NewArrivalsSwiper";
import MediaBuzzSwiper from "../components/swipers/MediaBuzzSwiper";
import ShopByLooksSwiper from "../components/swipers/ShopByLooksSwiper";


function RootPage(){
  const {dataStore} = useContext(AppWideContext);

  return (
    <Fragment>
      <PageHead url="/" id="home" isMobile={dataStore.mobile} />
      <InfoBand />
      <Navbar isMobile={dataStore.mobile} />
      <HomePageHeaderSwiper isMobile={dataStore.mobile} />
      <SafetyBlock isMobile={dataStore.mobile} />
      <NewArrivalsSwiper isMobile={dataStore.mobile} />
      <WhySalt isMobile={dataStore.mobile} />
      <AboutSalt isMobile={dataStore.mobile} />
      <MediaBuzzSwiper isMobile={dataStore.mobile} />
      <ShopByLooksSwiper isMobile={dataStore.mobile} />
      <DesignBlock isMobile={dataStore.mobile} />
      <Footer isMobile={dataStore.mobile} />
    </Fragment>
  )
}


export default RootPage;
