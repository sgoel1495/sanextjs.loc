import React from "react";
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang="en" xmlns="http://www.w3.org/1999/xhtml"  class="js fa-events-icons-ready" >
                <Head>
                    <link href="/static/css/bot_css/botui.min.css" rel="stylesheet" key="botui"/>
                    <link href="/static/css/bot_css/botui-theme-default.css" rel="stylesheet" key="bottheme"/>
                </Head>
                <body>
                <div id="toastContainer" className={"sticky z-toast top-10 right-10 float-right"}/>
                <div id="toastMobContainer" className={"fixed z-toast bottom-0 w-full"}/>
                <div id="hamburger"></div>
                <div id="userband"></div>
                <div id="cartside"></div>
                <div id="searchmenu"></div>
                <div id="measurementmodal"></div>
                <div id="bottomDrawer"></div>
                <Main/>
                <NextScript/>
                <div id="my-botui-app">
                    <div className="botui botui-container">
                        <div className="botui-messages-container">
                            <div className="header-div">
                                <div><span id="salt-logo"><img src="/assets/images/saltlogo-white.png" /></span> <span
                                    id="close-chat-btn"><img src="/assets/images/close-white.png" /></span></div>
                            </div>
                        </div>
                        <div className="botui-actions-container"></div>
                    </div>
                </div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
