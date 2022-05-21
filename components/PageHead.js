import Head from 'next/head';
import {Fragment} from 'react';
import getHeaderData from '../helpers/getHeaderData';
import Script from 'next/script'
import seoLogoScript1 from "./seo/seoLogoScript1.json";
import seoLogoScript2 from "./seo/seoLogoScript2.json";
import seoReviewScript from "./seo/seoReviewScript.json";
import seoContactScript from "./seo/seoContactScript.json";

/**
 *
 * @param {url, id, isMobile} props
 */

function PageHead(props) {
  const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
  const seoLogoScript1 = require('./seo/seoLogoScript1.json');
  const seoLogoScript2 = require('./seo/seoLogoScript2.json');
  const seoReviewScript = require('./seo/seoReviewScript.json');
  const seoContactScript = require('./seo/seoContactScript.json');

  const headerObject = getHeaderData(props.url, props.id);

  return <Fragment>
    <Head>
      <meta name="geo.region" content="IN-HR"/>
      <meta name="geo.placename" content="Gurugram"/>
      <meta name="geo.position" content="28.503091;77.081748"/>
      <meta name="ICBM" content="28.503091, 77.081748"/>

      <title>{headerObject.webTitle}</title>
      <meta name="description" content={headerObject.webDescription}/>
      <meta name="keywords" content={headerObject.webKeywords}/>
      <link rel="canonical" href={headerObject.webCanonical}/>
      <meta property="fb:app_id" content="253839508451663"/>
      <meta property="og:title" content={headerObject.webTitle}/>
      <meta property="og:description" content={headerObject.webDescription}/>
      <meta property="og:url" content={headerObject.webUrl}/>
      <meta property="og:image" content={headerObject.webImage}/>
      <meta property="og:image:secure_url" content={headerObject.webImage}/>
      <meta property="og:image:type" content="image/jpg"/>
      <meta property="og:type" content="website"/>
      <meta name="twitter:title" content={headerObject.webTitle}/>
      <meta name="twitter:description" content={headerObject.webDescription}/>
      <meta name="twitter:image" content={headerObject.webImage}/>
      <meta name="twitter:url" content={headerObject.webCanonical}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:site" content="@AttireSalt"/>
      <meta name="twitter:created" content="SaltAttire"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="icon" type="image/png" href={WEBASSETS + "/assets/images/salticon.png"}/>
      {(props.isMobile)
        ? <Fragment>
          <meta name="theme-color" content="#ffffff"/>
          <meta name="msapplication-navbutton-color" content="#ffffff"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff"/>
          <link rel="preload" href={WEBASSETS + "/assets/images/usericon-white.png"} as="image" type="image/jpg"/>
          <link rel="preload" href={WEBASSETS + "/assets/images/cart-white.png"} as="image" type="image/jpg"/>
          <link rel="preload" href={WEBASSETS + "/assets/images/menuicon-white.png"} as="image" type="image/jpg"/>
          <link rel="preload" href={WEBASSETS + "/assets/images/whatsapp-icon.png"} as="image" type="image/jpg"/>
          <link rel="preload" href={WEBASSETS + "/assets/images/saltlogo-white.png"} as="image" type="image/jpg"/>
        </Fragment>
        : null}
    </Head>
    <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoLogoScript1)
        }}
        id={"ophld1"}/>
    <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoLogoScript2)
        }}
        id={"ophld2"}/>
    <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoReviewScript)
        }}
        id={"ophld3"}/>
    <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoContactScript)
        }}
        id={"ophld4"}/>
  </Fragment>
}

export default PageHead;
