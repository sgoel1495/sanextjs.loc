import React from "react";
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDcoument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang="en" xmlns="http://www.w3.org/1999/xhtml">
                <Head/>
                <body>
                <div id="toast"></div>
                <div id="hamburger"></div>
                <div id="userband"></div>
                <div id="cartside"></div>
                <div id="searchmenu"></div>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDcoument;
