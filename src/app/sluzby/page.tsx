import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Služby - Kompletné rekonštrukcie a stavebné práce",
  description:
    "Naše služby: kompletné rekonštrukcie bytov, kúpeľní, bytových jadier, murárske práce, elektrina, voda, plyn, maľovanie, obklady a montážne práce.",
};

export default function SluzbyPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
          Služby
        </h1>
      </section>

      {/* Services Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                  <Link key={service.id} href={`/sluzby/${service.id}`}>
                    <div className="service-card bg-white border border-gray-100 overflow-hidden group h-full">
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-gray-300 text-2xl font-bold mb-2">
                          {service.number}.
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {service.shortDescription}
                        </p>
                        <span className="text-red-600 font-medium text-sm">
                          Zobraziť viac &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
