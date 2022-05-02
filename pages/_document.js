import React from "react";
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang="en" xmlns="http://www.w3.org/1999/xhtml">
                <Head/>
                <body>
                <div id="toastContainer" className={"sticky z-toast top-10 right-10 float-right"}/>
                <div id="toastMobContainer" className={"fixed z-toast bottom-0 w-full"}/>
                <div id="hamburger"></div>
                <div id="userband"></div>
                <div id="cartside"></div>
                <div id="searchmenu"></div>
                <div id="bottomDrawer"></div>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
