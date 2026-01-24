import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bytové jadro na kľúč – Trenčín | P+P STAV s.r.o.",
  description:
    "Rekonštrukcia bytového jadra v paneláku na kľúč (elektro + voda) v Trenčíne a okolí. Odvoz odpadu v cene. Obhliadka do 48h, rozpočet do 72h.",
  keywords:
    "bytové jadro Trenčín, rekonštrukcia jadra na kľúč, panelákové jadro, elektro voda, odvoz odpadu, P+P STAV",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Bytové jadro na kľúč – Trenčín | P+P STAV s.r.o.",
    description:
      "Panelákové jadro na kľúč (elektro + voda). Odvoz odpadu v cene. Obhliadka do 48h, rozpočet do 72h.",
    images: ["/sources/portfolio/01.jpg"],
    type: "website",
    locale: "sk_SK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bytové jadro na kľúč – Trenčín | P+P STAV s.r.o.",
    description:
      "Panelákové jadro na kľúč (elektro + voda). Odvoz odpadu v cene. Obhliadka do 48h, rozpočet do 72h.",
    images: ["/sources/portfolio/01.jpg"],
  },
};

export default function JadroNaKlucLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
