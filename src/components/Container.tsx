import type { ReactNode } from "react";

/**
 * Max-width wrapper used as the horizontal gutter on every section.
 * Keep all "page width" logic in this one place so changes propagate.
 */
export function Container({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}) {
  return (
    <As
      className={`mx-auto w-full max-w-[var(--max-content-width)] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </As>
  );
}
