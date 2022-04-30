import { Layout } from '@/components/layout/Layout';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Script src='https://unpkg.com/@highlightjs/cdn-assets@11.4.0/highlight.min.js' strategy='beforeInteractive' />
      {/* eslint-disable-next-line @next/next/inline-script-id */}
      <Script strategy='afterInteractive'>hljs.highlightAll();</Script>
    </>
  );
}
