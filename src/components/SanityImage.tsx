import Image, { type ImageProps } from "next/image";

import { urlFor } from "@/sanity/image";
import type { ImageWithAlt } from "@/sanity/types";

type Props = Omit<ImageProps, "src" | "alt"> & {
  source: ImageWithAlt;
  alt?: string;
  width: number;
  height: number;
};

/**
 * Wrapper around next/image that takes a Sanity asset reference and
 * generates the right CDN URL.
 */
export function SanityImage({ source, alt, width, height, ...rest }: Props) {
  const url = urlFor(source).width(width).height(height).auto("format").url();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const altText = alt ?? (source as any)?.alt ?? "";
  return (
    <Image
      src={url}
      alt={altText}
      width={width}
      height={height}
      {...rest}
    />
  );
}
