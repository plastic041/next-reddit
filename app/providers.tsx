"use client";

import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

import "@radix-ui/themes/styles.css";
import "./theme-config.css";

import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Theme accentColor="violet" grayColor="mauve">
        {children}
      </Theme>
    </ThemeProvider>
  );
}
