import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Článok nenájdený",
    };
  }

  const url = `https://ppstav.sk/blog/${post.slug}`;
  const ogImage = post.image.startsWith("http") ? post.image : `https://ppstav.sk${post.image}`;

  return {
    title: `${post.title} - P+P STAV Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date, // Note: date format in data might need parsing if ISO is required, but this is better than nothing
      authors: ["P+P STAV s.r.o."],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find adjacent posts for navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image.startsWith("http") ? post.image : `https://ppstav.sk${post.image}`,
    datePublished: post.date, // Ideally convert to ISO 8601 if possible, but raw date is okay for now or needs helper
    author: {
      "@type": "Organization",
      name: "P+P STAV s.r.o.",
    },
    publisher: {
      "@type": "Organization",
      name: "P+P STAV s.r.o.",
      logo: {
        "@type": "ImageObject",
        url: "https://ppstav.sk/sources/logo2.png",
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ppstav.sk/blog/${post.slug}`,
    },
  };

  // Simple markdown to HTML conversion for basic formatting
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => {
        // Headers
        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-bold mt-6 mb-3">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
              {line.replace("## ", "")}
            </h2>
          );
        }
        // List items
        if (line.startsWith("- ")) {
          const content = line.replace("- ", "");
          // Check for bold text
          const boldMatch = content.match(/\*\*(.+?)\*\*/);
          if (boldMatch) {
            const parts = content.split(/\*\*(.+?)\*\*/);
            return (
              <li key={index} className="ml-4 mb-1">
                {parts[0]}
                <strong>{parts[1]}</strong>
                {parts[2]}
              </li>
            );
          }
          return (
            <li key={index} className="ml-4 mb-1">
              {content}
            </li>
          );
        }
        // Empty lines
        if (line.trim() === "") {
          return <br key={index} />;
        }
        // Regular paragraphs
        return (
          <p key={index} className="mb-4 text-gray-600 leading-relaxed">
            {line}
          </p>
        );
      });
  };

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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${post.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <div className="text-sm text-gray-300 mb-4">{post.date}</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-300">{post.subtitle}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors mb-8"
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
                Späť na blog
              </Link>

              {/* Featured Image */}
              <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <article className="prose prose-lg max-w-none">
                {formatContent(post.content)}
              </article>

              {/* CTA */}
              <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">
                  Potrebujete poradiť s vašou rekonštrukciou?
                </h3>
                <p className="text-gray-600 mb-6">
                  Kontaktujte nás a radi vám pomôžeme s vašim projektom.
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
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors max-w-[45%]"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0"
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
                      <div className="font-medium line-clamp-1">{prevPost.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors max-w-[45%]"
                  >
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Nasledujúci</div>
                      <div className="font-medium line-clamp-1">{nextPost.title}</div>
                    </div>
                    <svg
                      className="w-5 h-5 flex-shrink-0"
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

            {/* Sidebar - Recommendations */}
            <aside className="lg:w-1/3">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold mb-6 border-b pb-3">Odporúčané články</h3>
                <div className="space-y-4">
                  {blogPosts
                    .filter((p) => p.slug !== slug)
                    .slice(0, 3)
                    .map((recommendedPost) => (
                      <Link
                        key={recommendedPost.slug}
                        href={`/blog/${recommendedPost.slug}`}
                        className="flex gap-4 group"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={recommendedPost.image}
                            alt={recommendedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-red-600 transition-colors">
                            {recommendedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{recommendedPost.date}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
