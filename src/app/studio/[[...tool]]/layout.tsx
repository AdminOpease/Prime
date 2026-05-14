/**
 * Bypass the site's root layout for the embedded Studio.
 * The Studio needs the full viewport with no site header/footer.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
