import React from "react";
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {

    /*
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

     */

    render() {
        return (<Html lang="en" xmlns="http://www.w3.org/1999/xhtml" className="js fa-events-icons-ready">
            <Head/>
            <body>
            {/*gtm*/}

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
            <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NVVBMQT" height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe>
                <img height="1" width="1" style={{display: "none"}}
                     src="https://www.facebook.com/tr?id=495978849168384&ev=PageView&noscript=1"
                /></noscript>
            </body>
        </Html>);
    }
}

export default MyDocument;
