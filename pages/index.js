import {Fragment, useContext} from 'react';
import PageHead from '../components/PageHead';

import Script from 'next/script';
import AppWideContext from "../store/AppWideContext";
import InfoBand from "../components/info-band/InfoBand";
import SafetyBlock from "../components/safety-block/SafetyBlock";
function RootPage(){
  const {dataStore} = useContext(AppWideContext);

  return (
    <Fragment>
      <PageHead url="/" id="home" isMobile={dataStore.mobile} />
      <InfoBand />
      <SafetyBlock />
    </Fragment>
  )
}


export default RootPage;
