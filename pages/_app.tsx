import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <body className="bg-gray-200 h-screen">
      <div className="container mx-auto gap-2 py-4 h-full">
        <Component {...pageProps} />
      </div>
    </body>
  );
}

export default MyApp;
