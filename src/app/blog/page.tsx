import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog - P+P STAV",
  description: "Články a novinky zo sveta stavebníctva a rekonštrukcií",
};

export default function BlogPage() {
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
          Blog
        </h1>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold mb-2 hover:text-red-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Čítať viac
                    <svg
                      className="w-4 h-4"
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
