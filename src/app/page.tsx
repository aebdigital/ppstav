"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/data/services";
import { getFeaturedProjects } from "@/data/projects";
import { heroImages, partners } from "@/data/contact";

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -150]);
  const featuredProjects = getFeaturedProjects();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Images */}
        <motion.div 
          className="absolute left-0 right-0 top-0 h-[120%] z-0"
          style={{ y }}
        >
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt="Hero Background"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 hero-overlay" />
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                KVALITNÉ STAVEBNÉ A REKONŠTRUKČNÉ SLUŽBY
              </h1>
              <p className="text-base md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl">
                Sme rodinná firma pôsobiaca v Trenčianskom kraji už od roku
                2002. Pomáhame ľuďom s rekonštrukciou domov a bytov, ale
                vykonávame aj rôzne ďalšie stavebné, montážne a inštalačné
                práce.
              </p>
              <div className="flex flex-row gap-2 md:gap-4">
                <Link
                  href="/referencie"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 text-sm md:px-8 md:py-4 md:text-base font-semibold uppercase tracking-wider transition-colors text-center flex-1 md:flex-none"
                >
                  Projekty
                </Link>
                <Link
                  href="/sluzby"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 py-3 text-sm md:px-8 md:py-4 md:text-base font-semibold uppercase tracking-wider transition-colors text-center flex-1 md:flex-none"
                >
                  Naše služby
                </Link>
              </div>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex gap-4 md:gap-8 justify-start md:justify-end"
            >
              <div className="text-center text-white">
                <div className="text-3xl md:text-6xl font-bold">
                  100<span className="text-red-500">+</span>
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider mt-1 md:mt-2">
                  Úspešných projektov
                </div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl md:text-6xl font-bold">22</div>
                <div className="text-xs md:text-sm uppercase tracking-wider mt-1 md:mt-2">
                  rokov skúseností
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-600 font-medium mb-4 block">
                — Kto sme
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6" data-text="O nás">
                O nás
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Už viac než 22 rokov prináša P+P STAV svojim zákazníkom
                komplexné rekonštrukcie bytov na profesionálnej úrovni.
                Kombinujeme rodinné hodnoty s modernými pracovnými postupmi a
                dôrazom na detail. Naším cieľom je dodať výsledok, ktorý predčí
                očakávania – kvalitne, rýchlo a s maximálnym ohľadom na potreby
                klienta.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-4 transition-all"
              >
                Kontaktovať nás
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Right - Image with Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/sources/portfolio/7.jpeg"
                  alt="P+P STAV stavebná spoločnosť"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 flex gap-2 md:gap-4">
                <div className="bg-gray-900 text-white p-3 md:p-6 rounded-lg">
                  <div className="text-xl md:text-3xl font-bold">
                    100<span className="text-red-500">+</span>
                  </div>
                  <div className="text-xs md:text-sm">Úspešných projektov</div>
                </div>
                <div className="bg-yellow-400 text-gray-900 p-3 md:p-6 rounded-lg">
                  <div className="text-xl md:text-3xl font-bold">22</div>
                  <div className="text-xs md:text-sm">rokov skúseností</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold mb-4 md:mb-0"
              data-text="Naše služby"
            >
              Naše služby
            </h2>
            <Link
              href="/sluzby"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold uppercase tracking-wider transition-colors inline-block"
            >
              Všetky služby
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.slice(0, 7).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/sluzby/${service.id}`} className="block h-full">
                  <div className="service-card bg-white p-6 h-full border border-gray-100 hover:border-red-600 flex flex-col">
                    <div className="text-red-600 text-4xl font-bold mb-4">
                      {service.number}.
                    </div>
                    <div className="w-12 h-12 text-gray-900 mb-4">
                      {service.icon === "home" && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                      )}
                      {service.icon === "bath" && (
                        <Image
                          src="/sources/bath_14107370.png"
                          alt={service.title}
                          width={48}
                          height={48}
                          className="grayscale"
                        />
                      )}
                      {service.icon === "lightning" && (
                        <Image
                          src="/sources/lightning_13764439.png"
                          alt={service.title}
                          width={48}
                          height={48}
                          className="grayscale"
                        />
                      )}
                      {service.icon === "bricks" && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <rect x="2" y="4" width="4" height="4" />
                          <rect x="7" y="4" width="4" height="4" />
                          <rect x="12" y="4" width="4" height="4" />
                          <rect x="17" y="4" width="4" height="4" />
                          <rect x="2" y="10" width="4" height="4" />
                          <rect x="7" y="10" width="4" height="4" />
                          <rect x="12" y="10" width="4" height="4" />
                          <rect x="17" y="10" width="4" height="4" />
                          <rect x="2" y="16" width="4" height="4" />
                          <rect x="7" y="16" width="4" height="4" />
                          <rect x="12" y="16" width="4" height="4" />
                          <rect x="17" y="16" width="4" height="4" />
                        </svg>
                      )}
                      {service.icon === "brush" && (
                        <Image
                          src="/sources/paint-brush_1825905.png"
                          alt={service.title}
                          width={48}
                          height={48}
                          className="grayscale"
                        />
                      )}
                      {service.icon === "door" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="4" y="2" width="16" height="20" rx="1" />
                          <rect x="6" y="4" width="12" height="8" rx="0.5" />
                          <rect x="6" y="14" width="12" height="6" rx="0.5" />
                          <circle cx="17" cy="17" r="1" fill="currentColor" />
                        </svg>
                      )}
                      {service.icon === "trash" && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {service.shortDescription}
                    </p>
                    <span className="block w-full text-center py-3 border border-gray-900 text-gray-900 font-medium text-sm uppercase tracking-wider hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                      Zobraziť viac
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl md:text-5xl font-bold mb-12 text-center"
            data-text="Naše projekty"
          >
            Naše projekty
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5px] mb-12">
            {featuredProjects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/referencie/${project.slug}`}>
                  <div className="portfolio-item aspect-[4/3] cursor-pointer group relative">
                    <Image
                      src={`/sources/portfolio/${project.folderName}/${project.images[0]}`}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="portfolio-overlay text-white">
                      <div className="text-xl font-semibold">{project.title}</div>
                      <div className="text-gray-300">{project.location}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/referencie"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:px-8 md:py-4 font-semibold uppercase tracking-wider transition-colors inline-block"
            >
              Všetky projekty
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Naši partneri</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={130}
                  height={82}
                  className="partner-logo object-contain max-h-20"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
