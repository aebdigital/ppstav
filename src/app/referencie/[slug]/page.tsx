"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { projects, getProjectBySlug } from "@/data/projects";
import Lightbox from "@/components/Lightbox";
import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
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
              {/* Main Image */}
              <div
                className="relative aspect-[16/9] mb-6 cursor-pointer overflow-hidden group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={imagePaths[0]}
                  alt={`${project.title} - hlavný obrázok`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePaths.slice(1).map((image, index) => (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (index % 8) * 0.05 }}
                    className="relative aspect-square cursor-pointer overflow-hidden group"
                    onClick={() => openLightbox(index + 1)}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - obrázok ${index + 2}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  </motion.div>
                ))}
              </div>

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

      {/* Lightbox */}
      <Lightbox
        images={imagePaths}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
