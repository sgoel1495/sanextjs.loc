import Head from 'next/head';
import {MobileView, BrowserView} from 'react-device-detect';
import {Fragment} from 'react';
import getHeaderData from '../helpers/getHeaderData';

/**
 *
 * @param {url, id, isMobile} props
 */

function PageHead(props) {
  const ASSETSURL = process.env.NEXT_PUBLIC_ASSETSURL;
  const seoLogoScript1 = require('./seo/seoLogoScript1.json');
  const seoLogoScript2 = require('./seo/seoLogoScript2.json');
  const seoReviewScript = require('./seo/seoReviewScript.json');
  const seoContactScript = require('./seo/seoContactScript.json');

  const gtmScript = `
        (function (b, m, h, a, g) {
            b[a] = b[a] || [];
            b[a].push({"gtm.start": new Date().getTime(), event: "gtm.js"});
            var k = m.getElementsByTagName(h)[0], e = m.createElement(h), c = a != "dataLayer" ? "&l=" + a : "";
            e.async = 1;
            e.src = "https://www.googletagmanager.com/gtm.js?id=" + g + c;
            // e.src = "/assets/javascripts/gtm.js?id=" + g + c;
            k.parentNode.insertBefore(e, k)
        })(window, document, "script", "dataLayer", "GTM-WK9X4QX");
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = true;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-99941247-1', 'auto');
        ga('send', 'pageview');
    `;

  const headerObject = getHeaderData(props.url, props.id);

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoLogoScript1)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoLogoScript2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoReviewScript)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoContactScript)
        }}
      />
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
      <link rel="icon" type="image/png" href={ASSETSURL + "/assets/images/salticon.png"}/>
      {(props.isMobile)
        ? <Fragment>
          <meta name="theme-color" content="#ffffff"/>
          <meta name="msapplication-navbutton-color" content="#ffffff"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff"/>
          <link rel="stylesheet" href={ASSETSURL + "/assets/stylesheets/swiper_min.css"}/>
          <link rel="preload" href={ASSETSURL + "/assets/images/usericon-white.png"} as="image" type="image/jpg"/>
          <link rel="preload" href={ASSETSURL + "/assets/images/cart-white.png"} as="image" type="image/jpg"/>
          <link rel="preload" href={ASSETSURL + "/assets/images/menuicon-white.png"} as="image" type="image/jpg"/>
          <link rel="preload" href={ASSETSURL + "/assets/images/whatsapp-icon.png"} as="image" type="image/jpg"/>
          <link rel="preload" href={ASSETSURL + "/assets/images/saltlogo-white.png"} as="image" type="image/jpg"/>
        </Fragment>
        : null}
      <script src={ASSETSURL + "/assets/javascripts/jquery_v2.2.4.js"}/>
      <script src={ASSETSURL + "/assets/javascripts/bot_js/moment.js"}/>
      <link rel="stylesheet" href="https://unpkg.com/botui/build/botui.min.css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="/css/bot-salt.css"/>
      <link rel="stylesheet" href="/css/salt.min_v0.2.2.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/css/swiper.min.css"/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"
              integrity="sha256-4iQZ6BVL4qNKlQ27TExEhBN1HFPvAvAMbFavKKosSWQ=" crossOrigin="anonymous"/>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"
        integrity="sha256-5YmaxAwMjIpMrVlK84Y/+NjCpKnFYa8bWWBbUHSBGfU=" crossOrigin="anonymous"/>
      <script dangerouslySetInnerHTML={{
        __html: gtmScript
      }}
      />
    </Head>
  )
}

export default PageHead;
