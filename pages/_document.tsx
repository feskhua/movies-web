import { Head, Html, Main, NextScript } from 'next/document';
import { ToastContainer } from 'react-toastify';

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body className="antialiased">
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}
