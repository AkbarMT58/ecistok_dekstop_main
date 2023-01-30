import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head>
          <script
            type="text/javascript"
            src="https://js.xendit.co/v1/xendit.min.js"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TL32MTD');`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `!function (w, d, t) {
                        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                        ttq.load('C8NFME5VV6OQ74PC6STG');
                        ttq.page();
                      }(window, document, 'ttq');`,
            }}
          ></script>
          <Script
            async={true}
            src="https://www.googletagmanager.com/gtag/js?id=GTM-TL32MTD"
          ></Script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GTM-TL32MTD');`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '281064940856570');
              fbq('track', 'PageView');`,
            }}
          ></script>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img
            height='1'
            width='1'
            className='hidden'
            src='https://www.facebook.com/tr?id=281064940856570&ev=PageView&noscript=1'
          />`,
            }}
          ></noscript>
          <meta
            name="facebook-domain-verification"
            content="r0iu1vjeqghcfqffas32j4aketm9w0"
          />
          <meta
            name="google-site-verification"
            content="ohjMzwbEJV1Wm5Wp7Vt3tv1bIylpAmpDJ2vw3nvA7B4"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TL32MTD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
          <Main />
          <NextScript />
          <div id="myportal" />
        </body>
      </Html>
    );
  }
}
