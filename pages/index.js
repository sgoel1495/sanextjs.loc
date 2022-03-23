import React, {Fragment, useContext} from 'react';
import PageHead from '../components/PageHead';

import Script from 'next/script';
import AppWideContext from "../store/AppWideContext";
function RootPage(){
  const {dataStore} = useContext(AppWideContext);

  return (
    <Fragment>
      <PageHead url="/" id="home" isMobile={dataStore.mobile} />
    </Fragment>
  )
}


export default RootPage;
