import { Roboto_Slab } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";

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
        <Theme accentColor="violet" grayColor="mauve">
          <div className="bg-[var(--accent-1)]">{children}</div>
        </Theme>
      </body>
    </html>
  );
}
