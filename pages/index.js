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


function RootPage(){
  const {dataStore} = useContext(AppWideContext);

  return (
    <Fragment>
      <PageHead url="/" id="home" isMobile={dataStore.mobile} />
      <InfoBand />
      <Navbar isMobile={dataStore.mobile} />
      <SafetyBlock isMobile={dataStore.mobile} />
      <WhySalt isMobile={dataStore.mobile} />
      <AboutSalt isMobile={dataStore.mobile} />
      <DesignBlock isMobile={dataStore.mobile} />
      <Footer isMobile={dataStore.mobile} />
    </Fragment>
  )
}


export default RootPage;
