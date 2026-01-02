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

  return {
    title: `${service.title} - P+P STAV`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  // Find current index and adjacent services
  const currentIndex = services.findIndex((s) => s.id === id);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <>
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
                    <span className="font-medium">{s.title}</span>
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
