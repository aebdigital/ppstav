"use client";

import { useState, useEffect } from "react";

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    } else {
      setSettings(JSON.parse(consent));
    }

    const handleOpenSettings = () => {
      setShowSettings(true);
      setShowBanner(false);
    };

    window.addEventListener("openCookieSettings", handleOpenSettings);
    return () => {
      window.removeEventListener("openCookieSettings", handleOpenSettings);
    };
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setSettings(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(necessaryOnly));
    setSettings(necessaryOnly);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveSettings = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(settings));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:p-6 z-50 shadow-lg">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm md:text-base">
                  Táto webová stránka používa cookies na zlepšenie vášho zážitku z prehliadania.
                  Niektoré cookies sú nevyhnutné pre fungovanie stránky, zatiaľ čo iné nám pomáhajú
                  analyzovať návštevnosť a zlepšovať naše služby.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 border border-white text-white text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Nastavenia
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 border border-white text-white text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Len nevyhnutné
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Prijať všetky
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Nastavenia cookies</h2>
                <button
                  onClick={() => {
                    setShowSettings(false);
                    if (!localStorage.getItem("cookieConsent")) {
                      setShowBanner(true);
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                Tu môžete prispôsobiť svoje nastavenia cookies. Nevyhnutné cookies nie je možné vypnúť,
                pretože sú potrebné pre správne fungovanie webovej stránky.
              </p>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Nevyhnutné cookies</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Tieto cookies sú potrebné pre základné fungovanie webovej stránky a nie je možné ich vypnúť.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="w-12 h-6 bg-red-600 rounded-full relative cursor-not-allowed">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Analytické cookies</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Pomáhajú nám pochopiť, ako návštevníci používajú našu webovú stránku (Google Analytics).
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => setSettings({ ...settings, analytics: !settings.analytics })}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          settings.analytics ? "bg-red-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            settings.analytics ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Marketingové cookies</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Používajú sa na zobrazovanie relevantných reklám a sledovanie ich účinnosti.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => setSettings({ ...settings, marketing: !settings.marketing })}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          settings.marketing ? "bg-red-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            settings.marketing ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={acceptNecessary}
                  className="flex-1 px-4 py-3 border border-gray-900 text-gray-900 text-sm font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  Len nevyhnutné
                </button>
                <button
                  onClick={saveSettings}
                  className="flex-1 px-4 py-3 bg-red-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Uložiť nastavenia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
