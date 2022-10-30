import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rubik's Timer PWA" />
        <meta name="description" content="Basic Rubik's Cube Timer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="msapplication-config"
          content="/images/icons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link
          rel="apple-touch-icon"
          href="/images/icons/touch-icon-iphone.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/images/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/images/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />

        <meta
          name="twitter:card"
          content="A basic rubik's cube timer made with NextJS"
        />
        <meta
          name="twitter:url"
          content="https://rubiks-timer-pwa.vercel.app"
        />
        <meta name="twitter:title" content="Rubik's Timer PWA" />
        <meta name="twitter:description" content="Basic Rubik's Cube Timer" />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@_jumbosisig" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="solb" />
        <meta property="og:description" content="Basic Rubik's Cube Timer" />
        <meta property="og:site_name" content="solb" />
        <meta property="og:url" content="https://rubiks-timer-pwa.vercel.app" />
        <meta
          property="og:image"
          content="https://rubiks-timer-pwa.vercel.app/icons/apple-touch-icon.png"
        />
      </Head>
      <body className="bg-white dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
