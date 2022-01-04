import {Fragment} from 'react';
import PageHead from '../components/PageHead';

import Script from 'next/script';
function RootPage(){
  return (
    <Fragment>
      <PageHead url="/" id="home" isMobile={isMobile}/>
    </Fragment>
  )
}


export default RootPage;
