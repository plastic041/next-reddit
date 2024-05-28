import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
	variants: {
		as: {
			h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
			h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-pretty",
			p: "leading-7 [&:not(:first-child)]:mt-6",
			blockquote: "mt-6 border-l-2 pl-6 italic",
			ul: "my-6 ml-6 list-disc [&>li]:mt-2",
			code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
		},
	},
	defaultVariants: {
		as: "p",
	},
});

type TypographyH1Props = {
	as?: "h1";
} & React.HTMLAttributes<HTMLHeadingElement>;
type TypographyH2Props = {
	as?: "h2";
} & React.HTMLAttributes<HTMLHeadingElement>;
type TypographyPProps = {
	as?: "p";
} & React.HTMLAttributes<HTMLParagraphElement>;
type TypographyBlockquoteProps = {
	as?: "blockquote";
} & React.HTMLAttributes<HTMLQuoteElement>;
type TypographyUlProps = { as?: "ul" } & React.HTMLAttributes<HTMLUListElement>;
type TypographyCodeProps = { as?: "code" } & React.HTMLAttributes<HTMLElement>;

type TypographyProps = VariantProps<typeof typographyVariants> & {
	asChild?: boolean;
} & (
		| TypographyH1Props
		| TypographyH2Props
		| TypographyPProps
		| TypographyBlockquoteProps
		| TypographyUlProps
		| TypographyCodeProps
	);

const Typography = ({
	className,
	as: Tag = "p",
	asChild,
	children,
	...props
}: TypographyProps) => {
	return (
		<Slot className={cn(typographyVariants({ as: Tag, className }))} {...props}>
			{asChild ? children : <Tag>{children}</Tag>}
		</Slot>
	);
};

export { Typography };
