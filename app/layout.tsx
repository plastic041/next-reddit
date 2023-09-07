import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./globals.css";

import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function App({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme accentColor="violet" grayColor="mauve">
          <div className="bg-[var(--accent-1)]">{children}</div>
        </Theme>
      </body>
    </html>
  );
}
