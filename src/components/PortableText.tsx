import {
  PortableText as PortableTextRoot,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { SanityImage } from "./SanityImage";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold tracking-tight sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight sm:text-2xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-[var(--color-foreground)]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-[var(--color-accent)] pl-4 text-lg italic text-[var(--color-muted-foreground)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href ?? "#"}
        className="text-[var(--color-accent)] underline-offset-2 hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="mt-6">
        <SanityImage
          source={value}
          alt={value.alt ?? ""}
          width={1200}
          height={700}
          className="rounded-lg"
        />
      </figure>
    ),
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextRoot value={value} components={components} />;
}
