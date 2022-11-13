/**
 * @todo OPTIONAL At the API server, you can restrict the token call only from the webserver ip for security
 */
import '../styles/globals.scss';
import '../styles/variables.css';
import '../styles/zoomInSwiper.scss';
import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Script from 'next/script'
import {persistor, store} from "../ReduxStore/store";
import AppWrapper from "../components/AppWrapper";
import AppLoading from "../components/common/AppLoading";
import {useRouter} from "next/router";


function MyApp({Component, pageProps}) {

    const facebookBlock = <Fragment>
        <Script src="https://connect.facebook.net/en_US/all.js?hash=c3e73dbaa85ad58c8934ca9e6c6f542c"
                crossOrigin="anonymous"/>
        <Script src="https://connect.facebook.net/signals/config/159270414641031?v=2.9.60&amp;r=stable" async=""/>
        <Script async="" src="https://connect.facebook.net/en_US/fbevents.js"/>

        <Script id="facebook-jssdk" src="https://connect.facebook.net/en_US/all.js"/>
    </Fragment>

    return <Fragment>
        <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NVVBMQT');`
        }} id={"gtm"}></Script>
        <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '495978849168384');
fbq('track', 'PageView');`
        }} id={"fb_pixel"}></Script>
        <Provider store={store}>
            <PersistGate loading={<AppLoading/>} persistor={persistor}>
                <AppWrapper>
                    <Component {...pageProps} />
                </AppWrapper>
            </PersistGate>
        </Provider>

        <Script src={"https://checkout.razorpay.com/v1/checkout.js"}/>
        <Script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://www.schema.org",
                        "@type": "WebSite",
                        "name": "Salt Attire",
                        "url": "https://saltattire.com/"
                    })
                }} id="ld1"/>
        <Script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://www.schema.org",
                        "@type": "Organization",
                        "name": "Salt Attire",
                        "url": "https://saltattire.com/",
                        "logo": "https://saltattire.com/assets/SALT_logo.png"
                    })
                }} id="ld2"/>
        <Script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://www.schema.org",
                        "@type": "LocalBusiness",
                        "name": "Salt Attire",
                        "url": "https://saltattire.com/",
                        "logo": "https://saltattire.com/assets/SALT_logo.png",
                        "image": "https://saltattire.com/assets/look-224/Full.v1.jpg",
                        "priceRange": "INR",
                        "telephone": "18002709515",
                        "description": " Our design team has a simple philosophy, design a nine to nine wardrobe for the contemporary working woman. We have anticipated your needs, your lifestyle, your schedule to create designs which are functional, sophisticated and chic. We focus on clean cuts with finer detailing. We understand the need for functionality without compromising on the aesthetic appeal.",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Plot 508, Udyog Vihar Phase V",
                            "addressLocality": "Gurugram",
                            "addressRegion": "Haryana",
                            "postalCode": "122022",
                            "addressCountry": "India"
                        },
                        "hasMap": "https://g.page/saltattire?share",
                        "openingHours": "Mo, Tu, We, Th, Fr,  09:00-07:00, Sa 09:00-02:00",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "Customer Service",
                            "telephone": "18002709515"
                        },
                        "aggregateRating": {
                            "ratingValue": "4.6",
                            "reviewCount": "5"
                        }
                    })
                }} id="ld3"/>
        <Script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://www.schema.org",
                        "@type": "LocalBusiness",
                        "name": "Salt Attire",
                        "url": "https://saltattire.com/",
                        "logo": "https://saltattire.com/assets/SALT_logo.png",
                        "image": "https://saltattire.com/assets/look-224/Full.v1.jpg",
                        "priceRange": "INR",
                        "telephone": "18002709515",
                        "description": " Our design team has a simple philosophy, design a nine to nine wardrobe for the contemporary working woman. We have anticipated your needs, your lifestyle, your schedule to create designs which are functional, sophisticated and chic. We focus on clean cuts with finer detailing. We understand the need for functionality without compromising on the aesthetic appeal.",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Plot 508, Udyog Vihar Phase V",
                            "addressLocality": "Gurugram",
                            "addressRegion": "Haryana",
                            "postalCode": "122022",
                            "addressCountry": "India"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "Customer Service",
                            "telephone": "18002709515"
                        }
                    })
                }} id="ld4"/>

    </Fragment>
}

/*
MyApp.getInitialProps = async (appContext) => {
    const returnObject = {apiToken: null};
    const callObject = apiDictionary("getToken");
    const response = await fetch(callObject.url, callObject.fetcher);
    const data = await response.json();
    if (data
        && data.hasOwnProperty("status")
        && data.status == 200
        && data.hasOwnProperty("response")
        && data.response.hasOwnProperty("token")
    )
        returnObject.apiToken = data.response.token;
    const appProps = await App.getInitialProps(appContext);
    return {pageProps: {...appProps.pageProps, ...returnObject}};
}
*/
export default MyApp;
