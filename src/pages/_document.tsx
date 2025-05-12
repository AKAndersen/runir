import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Font: Unica One */}
        <link href="https://fonts.googleapis.com/css2?family=Unica+One&display=swap" rel="stylesheet" />
        <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap"
            rel="stylesheet"
          />
      </Head>
      <body className="bg-white text-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
