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
  ],
  authors: [{ name: "P+P STAV s.r.o." }],
  creator: "P+P STAV s.r.o.",
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
        url: "https://ppstav.sk/sources/portfolio/7.jpeg",
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
    images: ["https://ppstav.sk/sources/portfolio/7.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
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
  return (
    <html lang="sk">
      <head>
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
