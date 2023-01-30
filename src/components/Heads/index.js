import Head from "next/head";

export default function Heads({
  title,
  description,
  keyword,
  ogTitle,
  ogDescription,
}) {
  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      {/* <link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
        rel='stylesheet'
      /> */}
      <title>
        {title
          ? `${title} | ocistok.com | Pusat Grosir Online | Jasa Import China`
          : ""}
      </title>

      <meta
        name="description"
        content={
          description
            ? description
            : `Sekarang belanja grosir import China untuk usaha semudah berbelanja di Marketplace OCISTOK COM terhubung langsung dengan supplier China tangan pertama seperti 1688, taobao, t mall, dan masih banyak lagi | ${title}`
        }
      />
      <meta name="keywords" content={keyword ? keyword : ""} />
      <meta
        property="og:title"
        content={
          ogTitle
            ? `${ogTitle} | OCISTOK.COM - Belanja Import dari Supplier China & Pabrik Langsung di 1 Website`
            : "OCISTOK.COM - Belanja Import dari Supplier China & Pabrik Langsung di 1 Website"
        }
      />
      <meta
        property="og:description"
        content={
          ogDescription
            ? ogDescription
            : "Sekarang belanja grosir import China untuk usaha semudah berbelanja di Marketplace OCISTOK COM terhubung langsung dengan supplier China tangan pertama seperti 1688, taobao, t mall, dan masih banyak lagi"
        }
      />
      <meta name="kredibel-verification" value="CNUFTC"></meta>
    </Head>
  );
}
