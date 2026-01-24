"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Domov" },
    { href: "/sluzby", label: "Služby" },
    { href: "/referencie", label: "Projekty" },
    { href: "/blog", label: "Blog" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 right-0 w-1 h-screen z-[60]">
        <div
          className="bg-red-600 w-full transition-all duration-100"
          id="scroll-progress"
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <Image
                src={isScrolled || isMobileMenuOpen ? "/sources/logo2.png" : "/sources/new.png"}
                alt="P+P STAV"
                width={180}
                height={60}
                className="h-16 w-auto"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link-underline relative text-base font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isActive(link.href) ? "active" : ""
                    } ${
                      isScrolled
                        ? isActive(link.href)
                          ? "text-gray-800"
                          : "text-gray-800 hover:text-gray-500"
                        : isActive(link.href)
                        ? "text-white"
                        : "text-white hover:text-gray-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Hamburger Menu */}
            <button
              className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-full transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-2 bg-gray-800"
                    : isScrolled
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
              />
              <span
                className={`block h-0.5 w-full transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "opacity-0"
                    : isScrolled
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
              />
              <span
                className={`block h-0.5 w-full transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-2 bg-gray-800"
                    : isScrolled
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-white transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{ top: "80px" }}
        >
          <ul className="flex flex-col items-center justify-center h-full gap-8 -mt-20">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link-underline relative text-2xl font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isActive(link.href) ? "active" : ""
                  } ${
                    isActive(link.href)
                      ? "text-gray-800"
                      : "text-gray-800 hover:text-gray-500"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
