import { twc } from "react-twc";

export const H1 = twc.h1`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`;
export const H2 = twc.h2`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`;
export const P = twc.p`leading-7 [&:not(:first-child)]:mt-6`;
export const Blockquote = twc.blockquote`mt-6 border-l-2 pl-6 italic`;
export const Ul = twc.ul`my-6 ml-6 list-disc [&>li]:mt-2`;
export const Code = twc.code`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`;
