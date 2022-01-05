import Head from 'next/head';
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

    const headerObject = getHeaderData(props.url, props.id);

    return (
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet"/>
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
        </Head>
    )
}

export default PageHead;
