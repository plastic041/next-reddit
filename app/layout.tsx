import { Roboto_Slab } from "next/font/google";

import "./theme-config.css";
import "./globals.css";

import { Providers } from "./providers";

import type { ReactNode } from "react";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
});

export default function App({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={robotoSlab.className}>
        <Providers>
          <div className="bg-[var(--accent-1)]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
