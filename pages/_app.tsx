import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-200 h-screen w-screen flex justify-center">
      <div className="container h-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
