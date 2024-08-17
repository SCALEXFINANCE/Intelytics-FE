import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="charting_library/charting_library.standalone.js"></Script>
        <Script src="datafeeds/udf/dist/bundle.js"></Script>
      </body>
    </Html>
  );
}
