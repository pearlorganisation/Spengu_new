import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="photo-picker-element"></div>

        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </Html>
  );
}
