import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { TopBar } from "@/components/TopBar";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd, TITLE_SUFFIX } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Study Abroad Consultants in Peshawar | ${TITLE_SUFFIX}`,
    template: `%s`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "study abroad consultants in Peshawar",
    "student visa consultants Peshawar",
    "study in UK from Pakistan",
    "study in Europe from Pakistan",
    "Hayatabad education consultant",
    "study abroad Pakistan",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `Study Abroad Consultants in Peshawar | ${TITLE_SUFFIX}`,
    description: site.description,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: `Study Abroad Consultants in Peshawar | ${TITLE_SUFFIX}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1F4E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}
    >
      <head>
        {/* Scroll-reveal elements ship with inline opacity:0 (see Reveal.tsx).
            Without JS they would never animate in, so force them visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[70] rounded-b-xl bg-gold px-5 py-3 text-sm font-semibold text-navy-dark focus:not-sr-only focus:absolute focus:left-4 focus:top-0"
        >
          Skip to content
        </a>

        <TopBar />
        <Header />

        {/* pb clears the mobile sticky CTA bar */}
        <main id="main" className="pb-16 lg:pb-0">
          {children}
        </main>

        <Footer />
        <FloatingWhatsApp />
        <StickyMobileCTA />

        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
