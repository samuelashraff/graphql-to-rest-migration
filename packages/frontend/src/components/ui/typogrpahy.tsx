import React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "p";

export function Typography({
    variant,
    children,
}: {
    variant: TypographyVariant;
    children: React.ReactNode;
}) {
    const classes = {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
    };

    const typographyClass = classes[variant];

    if (!typographyClass) {
        return null; // Handle unknown variants gracefully
    }

    return React.createElement(
        variant,
        { className: typographyClass },
        children,
    );
}
