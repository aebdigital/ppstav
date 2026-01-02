import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ReferencePage() {
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
          Referencie
        </h1>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5px]">
            {projects.map((project) => (
              <Link key={project.slug} href={`/referencie/${project.slug}`}>
                <div className="portfolio-item aspect-[4/3] cursor-pointer group relative overflow-hidden">
                  <Image
                    src={`/sources/portfolio/${project.folderName}/${project.images[0]}`}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="portfolio-overlay text-white">
                    <div className="text-xl font-semibold">{project.title}</div>
                    <div className="text-gray-300">{project.location}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
