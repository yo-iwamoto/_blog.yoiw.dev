import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='ja-JP'>
        <Head>
          {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
          <title>blog.yoiw.dev</title>
          <link
            rel='stylesheet'
            href='https://unpkg.com/@highlightjs/cdn-assets@11.4.0/styles/base16/espresso.min.css'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
