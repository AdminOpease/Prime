import type { ServiceCategory } from "@/sanity/types";

/**
 * SVG placeholder shown when a service doesn't have a real photo yet.
 * Each category gets its own subtle accent so cards feel distinct.
 * Replace by uploading a real image in Sanity Site Settings → Service → Hero Image.
 */

const CATEGORY_META: Record<
  ServiceCategory,
  { label: string; sub: string; accent: string }
> = {
  bodywork: {
    label: "Bodywork",
    sub: "Accident & Panel Repair",
    accent: "#dc2626",
  },
  "van-fleet": {
    label: "Van & Fleet",
    sub: "Commercial Vehicle Bodywork",
    accent: "#f59e0b",
  },
  defleet: {
    label: "End-of-Hire",
    sub: "Defleet Preparation",
    accent: "#0ea5e9",
  },
  "insurance-private": {
    label: "Insurance",
    sub: "& Private Work",
    accent: "#22c55e",
  },
};

export function ServicePlaceholderImage({
  category,
  className = "",
}: {
  category: ServiceCategory;
  className?: string;
}) {
  const meta = CATEGORY_META[category] ?? {
    label: "Service",
    sub: "",
    accent: "#f59e0b",
  };

  return (
    <svg
      viewBox="0 0 600 450"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${meta.label} — placeholder image`}
      role="img"
    >
      <defs>
        <linearGradient id={`bg-${category}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <pattern
          id={`lines-${category}`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(135)"
        >
          <line x1="0" y1="0" x2="0" y2="14" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.06" />
        </pattern>
      </defs>

      {/* Base gradient background */}
      <rect width="600" height="450" fill={`url(#bg-${category})`} />

      {/* Diagonal pattern overlay */}
      <rect width="600" height="450" fill={`url(#lines-${category})`} />

      {/* Radial highlight top-centre */}
      <circle cx="300" cy="60" r="280" fill={meta.accent} opacity="0.14" />

      {/* Accent bar top-left */}
      <rect x="40" y="40" width="60" height="4" fill={meta.accent} />

      {/* Small category tag top */}
      <text
        x="40"
        y="70"
        fill={meta.accent}
        fontFamily="sans-serif"
        fontWeight="700"
        fontSize="14"
        letterSpacing="3"
      >
        PRIME · BODYWORK
      </text>

      {/* Big service label */}
      <text
        x="40"
        y="270"
        fill="#f8fafc"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="72"
        letterSpacing="-2"
      >
        {meta.label}
      </text>

      {/* Sub-label */}
      <text
        x="40"
        y="310"
        fill="#f8fafc"
        opacity="0.65"
        fontFamily="sans-serif"
        fontWeight="500"
        fontSize="22"
      >
        {meta.sub}
      </text>

      {/* Bottom accent line */}
      <rect x="0" y="446" width="600" height="4" fill={meta.accent} opacity="0.9" />
    </svg>
  );
}
