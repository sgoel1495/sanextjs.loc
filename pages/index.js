import {Fragment, useContext} from 'react';
import PageHead from '../components/PageHead';

import Script from 'next/script';
import AppWideContext from "../store/AppWideContext";
import Homepage from "./homepage";
function RootPage(){
  const {dataStore} = useContext(AppWideContext);

  return (
    <Fragment>
      <PageHead url="/" id="home" isMobile={dataStore.mobile} />
      <Homepage/>
    </Fragment>
  )
}


export default RootPage;
