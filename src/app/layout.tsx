import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteSettings } from "@/sanity/data";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const tagline = settings.tagline ?? "Van & fleet bodywork specialists in Luton";
  const title = `${settings.businessName} | ${tagline}`.trim();
  const description =
    "Specialist body repair centre in Luton — van & fleet bodywork, accident repair, end-of-hire prep and insurance work. Delivery service partners, fleet operators and private customers welcome.";
  const url = "https://primebodywork.co.uk";

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${settings.businessName}`,
    },
    description,
    // Open Graph / Twitter — controls how the link previews when shared
    // (WhatsApp, iMessage, Facebook, etc.). The preview image is provided
    // by src/app/opengraph-image.png, which Next.js wires in automatically.
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: settings.businessName,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
