import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import ProjectGallery from "@/components/ProjectGallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projekt nenájdený",
    };
  }

  const url = `https://ppstav.sk/referencie/${project.slug}`;
  const mainImage = `/sources/portfolio/${project.folderName}/${project.images[0]}`;
  const ogImage = `https://ppstav.sk${mainImage}`;

  return {
    title: `${project.title} | ${project.location} - P+P STAV`,
    description: `Realizácia projektu: ${project.title} v lokalite ${project.location}. Rozsah prác: ${project.scope}.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | ${project.location}`,
      description: `Rozsah prác: ${project.scope}`,
      url: url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find current index and adjacent projects
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Build full image paths
  const imagePaths = project.images.map(
    (img) => `/sources/portfolio/${project.folderName}/${img}`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${project.title} - ${project.location}`,
    description: `Realizácia projektu ${project.title}. Lokalita: ${project.location}. Rozsah prác: ${project.scope}`,
    primaryImageOfPage: `https://ppstav.sk${imagePaths[0]}`,
    provider: {
      "@type": "LocalBusiness",
      name: "P+P STAV s.r.o.",
    },
    datePublished: project.year, // Using year as string is loosely okay, schema prefers ISO date but for Year it's acceptable in some contexts or just omit if unsure.
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section
        className="relative h-[30vh] min-h-[200px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${imagePaths[0]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Project Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-8">
                  {project.title}
                </h1>

                <h3 className="text-lg font-bold mb-4">Detaily projektu</h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-red-600 pl-4">
                    <div className="text-sm text-gray-500 uppercase">Lokalita</div>
                    <div className="font-medium">{project.location}</div>
                  </div>

                  <div className="border-l-4 border-red-600 pl-4">
                    <div className="text-sm text-gray-500 uppercase">Rozsah prác</div>
                    <div className="font-medium">{project.scope}</div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/kontakt"
                    className="inline-block w-full text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold uppercase tracking-wider transition-colors"
                  >
                    Kontaktovať nás
                  </Link>
                </div>

                <div className="mt-8">
                  <Link
                    href="/referencie"
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
                    Späť na referencie
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content - Gallery */}
            <div className="lg:col-span-3">
              <ProjectGallery imagePaths={imagePaths} title={project.title} />

              {/* Navigation */}
              <div className="mt-12 flex justify-between items-center border-t pt-8">
                {prevProject ? (
                  <Link
                    href={`/referencie/${prevProject.slug}`}
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
                    <div className="text-left">
                      <div className="text-sm text-gray-400">Predchádzajúci</div>
                      <div className="font-medium">{prevProject.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextProject ? (
                  <Link
                    href={`/referencie/${nextProject.slug}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Nasledujúci</div>
                      <div className="font-medium">{nextProject.title}</div>
                    </div>
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