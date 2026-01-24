import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

const BASE_URL = "https://ppstav.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const routes = [
    "",
    "/kontakt",
    "/sluzby",
    "/referencie",
    "/blog",
    "/ochrana-osobnych-udajov",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic Blog Posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(), // Ideally this would come from the post data if updated
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic Services
  const serviceRoutes = services.map((service) => ({
    url: `${BASE_URL}/sluzby/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Dynamic Projects
  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/referencie/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes, ...serviceRoutes, ...projectRoutes];
}
