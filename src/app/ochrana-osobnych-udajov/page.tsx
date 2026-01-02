import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov - P+P STAV",
  description: "Zásady ochrany osobných údajov spoločnosti P+P STAV s.r.o.",
};

export default function OchranaOsobnychUdajovPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[30vh] min-h-[200px] flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/sources/heromain/shutterstock_2445260609.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider text-center px-4">
          Ochrana osobných údajov
        </h1>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {/* Company Info */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg not-prose">
              <p className="font-bold text-lg mb-2">Pavol Poruban - P+P STAV s. r. o.</p>
              <p className="text-gray-600">
                Trenčianska Turná 515<br />
                913 21 Trenčianska Turná<br />
                Slovenská republika
              </p>
              <p className="text-gray-600 mt-2">
                IČO: 50330438<br />
                DIČ: 2120279469
              </p>
              <p className="text-gray-600 mt-2">
                E-mail: <a href="mailto:pavolporuban@ppstav.sk" className="text-red-600 hover:underline">pavolporuban@ppstav.sk</a><br />
                Tel.: <a href="tel:+421903753882" className="text-red-600 hover:underline">+421 903 753 882</a>
              </p>
            </div>

            <p className="text-gray-600 mb-8">
              Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
            </p>

            {/* Section I */}
            <h2 className="text-2xl font-bold mt-8 mb-4">I. Kontaktný formulár</h2>
            <p className="text-gray-600 mb-4">
              Na stránke prevádzkujeme kontaktný formulár ktorého účelom je umožniť vám:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              <li>Položiť otázku k našim produktom a službám</li>
              <li>Požiadať o cenovú ponuku</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">Rozsah spracúvaných údajov:</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              <li>Meno a priezvisko</li>
              <li>E-mailová adresa</li>
              <li>Telefónne číslo</li>
              <li>Správu</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">Účel spracovania:</h3>
            <p className="text-gray-600 mb-4">
              Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">Právny základ:</h3>
            <p className="text-gray-600 mb-4">
              Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">Doba uchovávania:</h3>
            <p className="text-gray-600 mb-4">
              Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
            </p>

            {/* Section II */}
            <h2 className="text-2xl font-bold mt-8 mb-4">II. Súbory cookies</h2>
            <p className="text-gray-600 mb-4">
              Na našej webovej stránke používame cookies výlučne na nasledujúce účely:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              <li><strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).</li>
              <li><strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">Správa súhlasov:</h3>
            <p className="text-gray-600 mb-4">
              Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.
            </p>

            {/* Section III */}
            <h2 className="text-2xl font-bold mt-8 mb-4">III. Práva dotknutej osoby</h2>
            <p className="text-gray-600 mb-4">
              Podľa nariadenia GDPR máte nasledujúce práva:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              <li>Prístup k osobným údajom, ktoré spracúvame</li>
              <li>Oprava nepresných alebo neúplných údajov</li>
              <li>Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ</li>
              <li>Obmedzenie spracovania</li>
              <li>Prenosnosť údajov</li>
              <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
              <li>Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">www.dataprotection.gov.sk</a>)</li>
            </ul>

            <p className="text-gray-600 mb-4">
              V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na <a href="mailto:pavolporuban@ppstav.sk" className="text-red-600 hover:underline">pavolporuban@ppstav.sk</a> alebo telefónnom čísle <a href="tel:+421903753882" className="text-red-600 hover:underline">+421 903 753 882</a>.
            </p>

            <p className="text-gray-600 mt-8 font-medium">
              Tieto Zásady nadobúdajú účinnosť dňom 25. 7. 2025.
            </p>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Späť na úvodnú stránku
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
