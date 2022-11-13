import React from "react";
import Document, {Html, Head, Main, NextScript} from 'next/document';
import Script from "next/script";

class MyDocument extends Document {

    /*
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

     */

    render() {
        return (<Html lang="en" xmlns="http://www.w3.org/1999/xhtml" className="js fa-events-icons-ready">
            <Head>
                {/*gtm*/}
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
            </Head>
            <body>
            {/*gtm*/}
            <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NVVBMQT" height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe>
                <img height="1" width="1" style={{display: "none"}}
                           src="https://www.facebook.com/tr?id=495978849168384&ev=PageView&noscript=1"
            /></noscript>
            <div id="toastContainer" className={"sticky z-toast top-10 right-10 float-right"}></div>
            <div id="toastMobContainer" className={"fixed z-toast bottom-0 w-full"}></div>
            <div id="hamburger"></div>
            <div id="userband"></div>
            <div id="cartside"></div>
            <div id="searchmenu"></div>
            <div id="measurementmodal"></div>
            <div id="paymentpopup"></div>
            <div id="bottomDrawer"></div>
            <div id="notifyModal"></div>
            <Main/>
            <NextScript/>
            </body>
        </Html>);
    }
}

export default MyDocument;
