import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "P+P STAV s.r.o. - Profesionálne stavebné práce a rekonštrukcie",
    template: "%s | P+P STAV s.r.o.",
  },
  description:
    "P+P STAV s.r.o. - profesionálne stavebné práce, kompletné rekonštrukcie bytov, kúpeľní, bytových jadier. Kvalitné murárske, elektrikárske a inštalatérske práce na kľúč.",
  keywords: [
    "stavebné práce",
    "rekonštrukcia bytov",
    "murárske práce",
    "elektrikárske práce",
    "inštalatérske práce",
    "kúpeľne",
    "bytové jadrá",
    "P+P STAV",
    "Trenčín",
    "rekonštrukcia domu",
    "zateplenie",
    "obklady a dlažby",
    "sadrokartón",
    "Trenčiansky kraj",
    "stavebná firma Trenčín",
    "rekonštrukcia na kľúč",
  ],
  authors: [{ name: "P+P STAV s.r.o." }],
  creator: "P+P STAV s.r.o.",
  metadataBase: new URL("https://ppstav.sk"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://ppstav.sk",
    siteName: "P+P STAV s.r.o.",
    title: "P+P STAV s.r.o. - Profesionálne stavebné práce a rekonštrukcie",
    description:
      "Profesionálne stavebné práce, kompletné rekonštrukcie bytov, kúpeľní, bytových jadier. Kvalitné murárske, elektrikárske a inštalatérske práce na kľúč.",
    images: [
      {
        url: "/sources/portfolio/7.jpeg",
        width: 1200,
        height: 630,
        alt: "P+P STAV s.r.o.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P+P STAV s.r.o. - Profesionálne stavebné práce a rekonštrukcie",
    description:
      "Profesionálne stavebné práce, kompletné rekonštrukcie bytov, kúpeľní, bytových jadier. Kvalitné murárske, elektrikárske a inštalatérske práce na kľúč.",
    images: ["/sources/portfolio/7.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "P+P STAV s.r.o.",
    image: "https://ppstav.sk/sources/logo2.png",
    url: "https://ppstav.sk",
    telephone: "+421 903 753 882",
    email: "pavolporuban@ppstav.sk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Trenčianska Turná 515",
      addressLocality: "Trenčianska Turná",
      postalCode: "913 21",
      addressCountry: "SK",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "16:00",
    },
    sameAs: [
      "https://www.facebook.com/ppstavsk",
      "https://www.instagram.com/ppstav_poruban/",
    ],
  };

  return (
    <html lang="sk">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SF1J2S8PM8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SF1J2S8PM8');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
