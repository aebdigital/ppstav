"use client";

import { useState } from "react";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";

export default function JadroNaKlucPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    panelak: "",
    scope: "",
    budget: "",
    start: "",
    email: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "jadro",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(true);
        setFormData({
          name: "",
          phone: "",
          location: "",
          panelak: "",
          scope: "",
          budget: "",
          start: "",
          email: "",
          message: "",
          consent: false,
        });
      } else {
        setError(result.message || "Nastala chyba pri odosielaní.");
      }
    } catch {
      setError("Nastala chyba pri odosielaní. Skúste prosím neskôr.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
      {/* Hero Section - matching other pages */}
      <section
        className="relative h-[40vh] min-h-[300px] flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/sources/heromain/shutterstock_2445260609.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider">
            Bytové jadro na kľúč
          </h1>
        </div>
      </section>

      {/* Info Banner Section */}
      <section className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg md:text-xl mb-6">
              Panelákové jadro <strong>vrátane elektro + vody</strong>.{" "}
              <strong>Odvoz odpadu</strong> v cene. Obhliadka do{" "}
              <strong>48 hodín</strong>, rozpočet do <strong>72 hodín</strong>.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <div className="bg-white/10 border border-white/25 px-4 py-2 font-semibold uppercase text-sm tracking-wide">
                Typicky od 7 000 €
              </div>
              <div className="bg-white/10 border border-white/25 px-4 py-2 font-semibold uppercase text-sm tracking-wide">
                Najčastejšie 7–10k €
              </div>
              <div className="bg-white/10 border border-white/25 px-4 py-2 font-semibold uppercase text-sm tracking-wide">
                Termín 4–8 týždňov
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              <button
                onClick={() => {
                  document.getElementById("formular")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold uppercase tracking-wide transition-colors cursor-pointer"
              >
                Chcem obhliadku
              </button>
              <a
                href="tel:+421903753882"
                className="border-2 border-white/75 hover:border-white text-white px-6 py-3 font-bold uppercase tracking-wide transition-colors"
              >
                Zavolať 0903 753 882
              </a>
            </div>

            <p className="text-sm text-white/80">
              Ak sa nedovoláte, ozveme sa späť. (Počas pracovných hodín ideálne
              do 30 min.)
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10">
            {/* Left Content */}
            <div className="bg-white border border-gray-200 shadow-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Na kľúč. Bez naháňania remeselníkov.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Toto je pre ľudí, ktorí nechcú riešiť koordináciu profesií,
                bordel na chodbe a „kto mi príde kedy". Robíme jadro na kľúč
                vrátane elektro a vody a zabezpečíme aj odvoz odpadu.
              </p>

              {/* Pricing Callout */}
              <div className="border-l-4 border-red-600 bg-red-50 p-4 mb-6">
                <p className="mb-1">
                  <strong>Cena:</strong> typicky <strong>od 7 000 €</strong>{" "}
                  (najčastejšie <strong>7 000–10 000 €</strong> podľa rozsahu).
                </p>
                <p>
                  <strong>Termín realizácie:</strong> zvyčajne{" "}
                  <strong>4–8 týždňov</strong> podľa kapacity.
                </p>
              </div>

              <h3 className="text-xl font-bold mb-3">Čo je v tom</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
                <li>
                  Jadro na kľúč vrátane <strong>elektro + vody</strong>
                </li>
                <li>
                  <strong>Odvoz odpadu</strong> a organizácia prác
                </li>
                <li>
                  Obhliadka do <strong>48h</strong>, rozpočet do{" "}
                  <strong>72h</strong>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-3">Ako to prebieha</h3>
              <div className="space-y-3 mb-6">
                <div className="border border-gray-100 p-3 bg-white">
                  <strong>1)</strong> Vyplníte krátky dotazník (3 min)
                </div>
                <div className="border border-gray-100 p-3 bg-white">
                  <strong>2)</strong> Dohodneme obhliadku (do 48h)
                </div>
                <div className="border border-gray-100 p-3 bg-white">
                  <strong>3)</strong> Dostanete rozpočet a termín (do 72h)
                </div>
                <div className="border border-gray-100 p-3 bg-white">
                  <strong>4)</strong> Realizácia na kľúč + odvoz odpadu
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">
                Poznámka k cene (aby sme si ušetrili čas)
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ak hľadáte najnižšiu cenu, pravdepodobne nebudeme správna voľba.
                Robíme to na kľúč vrátane elektro a vody, preto je dôležité
                nastaviť rozpočet a rozsah hneď na začiatku.
              </p>
            </div>

            {/* Right Form */}
            <div
              id="formular"
              className="bg-white border border-gray-200 shadow-lg p-8 scroll-mt-24"
            >
              <h2 className="text-3xl font-bold mb-6">Nezáväzná obhliadka</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-semibold mb-2 text-gray-800"
                    >
                      Meno *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-semibold mb-2 text-gray-800"
                    >
                      Telefón *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="0903 123 456"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="location"
                      className="block font-semibold mb-2 text-gray-800"
                    >
                      Lokalita *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="Trenčín / okolie"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="panelak"
                      className="block font-semibold mb-2 text-gray-800"
                    >
                      Panelákové jadro? *
                    </label>
                    <select
                      id="panelak"
                      name="panelak"
                      value={formData.panelak}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors bg-white"
                    >
                      <option value="">— vyberte —</option>
                      <option value="ano">Áno</option>
                      <option value="nie">Nie</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="scope"
                      className="block font-semibold mb-2 text-gray-800"
                    >
                      Rozsah *
                    </label>
                    <select
                      id="scope"
                      name="scope"
                      value={formData.scope}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors bg-white"
                    >
                      <option value="">— vyberte —</option>
                      <option value="jadro_na_kluc">
                        Bytové jadro na kľúč (elektro + voda)
                      </option>
                      <option value="komplet_byt">
                        Kompletná rekonštrukcia bytu
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block font-semibold mb-2 text-gray-800"
                    >
                      Rozpočet *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors bg-white"
                    >
                      <option value="">— vyberte —</option>
                      <option value="do_6000">do 6 000 €</option>
                      <option value="6000_7000">6 000 – 7 000 €</option>
                      <option value="7000_10000">7 000 – 10 000 €</option>
                      <option value="10000_plus">10 000 €+</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="start"
                      className="block font-semibold mb-2 text-gray-800"
                    >
                      Kedy chcete začať? *
                    </label>
                    <select
                      id="start"
                      name="start"
                      value={formData.start}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors bg-white"
                    >
                      <option value="">— vyberte —</option>
                      <option value="do_2_tyzdnov">do 2 týždňov</option>
                      <option value="3_6_tyzdnov">3 – 6 týždňov</option>
                      <option value="6_10_tyzdnov">6 – 10 týždňov</option>
                      <option value="10_plus">10+ týždňov</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-semibold mb-2 text-gray-800"
                    >
                      Email (voliteľné)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ak chcete ponuku aj emailom"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-semibold mb-2 text-gray-800"
                  >
                    Poznámka *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder="Krátko: čo chcete meniť, poschodie, výťah, prípadne foto/link."
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-red-600 transition-colors resize-none"
                  />
                </div>

                <label className="flex gap-3 items-start text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                  <span>
                    Súhlasím so spracovaním údajov za účelom kontaktovania a
                    prípravy cenovej ponuky.{" "}
                    <Link
                      href="/ochrana-osobnych-udajov"
                      className="text-red-600 hover:underline"
                    >
                      Ochrana osobných údajov
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-8 py-4 font-bold uppercase tracking-wide transition-colors"
                >
                  {isSubmitting ? "Odosiela sa..." : "Chcem obhliadku"}
                </button>

                {error && (
                  <div className="p-4 bg-red-100 text-red-800 border border-red-200">
                    {error}
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  Poznámka: Realizácia býva typicky 4–8 týždňov. Ak potrebujete
                  termín „hneď", napíšte to – povieme rovno, či je to reálne.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
