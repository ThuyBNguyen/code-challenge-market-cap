import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): React.ReactElement {
    return (
      <Html>
        <Head>
          {process.env.SERVER_ENV !== 'production' && <meta name="robots" content="noindex" />}
          {process.env.SERVER_ENV === 'production' && (
            <>
              {/* Google Tag Manager - Global base code */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=${process.env.GOOGLE_TAG_AUTH}&gtm_preview=${process.env.GOOGLE_TAG_PREVIEW}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer', '${process.env.GOOGLE_TAG_ID}');
                  `,
                }}
              />
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.GOOGLE_TAG_TRACKING_ID}',{
                      page_path: window.location.pathname,
                  });
                  `,
                }}
              />
              <meta
                name="google-site-verification"
                content={process.env.GOOGLE_SITE_VERIFICATION}
              />
              <meta
                name="facebook-domain-verification"
                content={process.env.FACEBOOK_DOMAIN_VERIFICATION}
              />
            </>
          )}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,500&display=swap&subset=japanese"
            as="font"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_ID}&gtm_auth=${process.env.GOOGLE_TAG_AUTH}&gtm_preview=${process.env.GOOGLE_TAG_PREVIEW}&gtm_cookies_win=x`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
