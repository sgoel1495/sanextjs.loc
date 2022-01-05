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
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDcoument;
