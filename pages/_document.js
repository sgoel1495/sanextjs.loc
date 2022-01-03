import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDcoument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head/>
        <body className='body-home'>
          <noscript>
            <iframe id="gtmiframe" src="https://www.googletagmanager.com/ns.html?id=GTM-WK9X4QX"></iframe>
          </noscript>

          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDcoument;
