import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceById } from "@/data/services";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return {
      title: "Služba nenájdená",
    };
  }

  const url = `https://ppstav.sk/sluzby/${service.id}`;
  const ogImage = service.image.startsWith("http") ? service.image : `https://ppstav.sk${service.image}`;

  return {
    title: `${service.title} - P+P STAV`,
    description: service.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} - P+P STAV`,
      description: service.shortDescription,
      url: url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: "P+P STAV s.r.o.",
    },
    description: service.shortDescription,
    image: service.image.startsWith("http") ? service.image : `https://ppstav.sk${service.image}`,
    areaServed: {
      "@type": "City",
      name: "Trenčín",
    },
  };

  // Find current index and adjacent services
  const currentIndex = services.findIndex((s) => s.id === id);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section
        className="relative h-[40vh] min-h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${service.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-4">Výber služby</h3>
              <nav className="space-y-2">
                {services.map((s) => (
                  <Link
                    key={s.id}
                    href={`/sluzby/${s.id}`}
                    className={`block p-3 border transition-colors ${
                      s.id === id
                        ? "border-red-600 text-red-600 bg-red-50"
                        : "border-gray-200 hover:border-red-600 hover:text-red-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex-shrink-0">
                        {s.icon === "home" && (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                          </svg>
                        )}
                        {s.icon === "bath" && (
                          <Image
                            src="/sources/bath_14107370.png"
                            alt=""
                            width={20}
                            height={20}
                            className="grayscale object-contain"
                          />
                        )}
                        {s.icon === "lightning" && (
                          <Image
                            src="/sources/lightning_13764439.png"
                            alt=""
                            width={20}
                            height={20}
                            className="grayscale object-contain"
                          />
                        )}
                        {s.icon === "bricks" && (
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
                        {s.icon === "brush" && (
                          <Image
                            src="/sources/paint-brush_1825905.png"
                            alt=""
                            width={20}
                            height={20}
                            className="grayscale object-contain"
                          />
                        )}
                        {s.icon === "door" && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="4" y="2" width="16" height="20" rx="1" />
                            <rect x="6" y="4" width="12" height="8" rx="0.5" />
                            <rect x="6" y="14" width="12" height="6" rx="0.5" />
                            <circle cx="17" cy="17" r="1" fill="currentColor" />
                          </svg>
                        )}
                        {s.icon === "trash" && (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">{s.title}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                {service.fullDescription.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Service Image */}
              <div className="mt-8 relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CTA */}
              <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">
                  Máte záujem o túto službu?
                </h3>
                <p className="text-gray-600 mb-6">
                  Kontaktujte nás a pripravíme vám nezáväznú cenovú ponuku na mieru.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-semibold uppercase tracking-wider transition-colors"
                >
                  Kontaktovať nás
                </Link>
              </div>

              {/* Navigation */}
              <div className="mt-12 flex justify-between items-center border-t pt-8">
                {prevService ? (
                  <Link
                    href={`/sluzby/${prevService.id}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
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
                    <span>{prevService.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextService ? (
                  <Link
                    href={`/sluzby/${nextService.id}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <span>{nextService.title}</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
